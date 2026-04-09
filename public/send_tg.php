<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
// 1. Настройки безопасности и заголовки
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *"); // Разрешить запросы с любого домена (для разработки)
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Обработка preflight-запроса OPTIONS (нужно для fetch)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 2. Конфигурация Telegram (ЗАМЕНИТЕ НА ВАШИ ДАННЫЕ)
$botToken = "8700204431:AAGFr9nvSdGgkrXB42vp3GWS15mCmiHEhFc";
$chatId = "7982891265";

// 3. Получение данных из POST-запроса
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Нет данных"]);
    exit;
}

// 4. Формирование текста сообщения
$name = isset($data['name']) ? strip_tags($data['name']) : 'Не указано';
$phone = isset($data['phone']) ? strip_tags($data['phone']) : 'Не указано';
$total = isset($data['total']) ? $data['total'] : 0;
$brand = isset($data['brand']) ? strip_tags($data['brand']) : 'Неизвестно';
$source = isset($data['source']) ? strip_tags($data['source']) : 'Калькулятор';

// Форматирование цены
$priceText = ($total == 0) ? "Бесплатная диагностика" : "от " . number_format($total, 0, '.', ' ') . " ₽";

$message = "<b>🚀 Новая заявка!</b>\n\n";
$message .= "<b>Источник:</b> {$source}\n";
$message .= "<b>Бренд:</b> {$brand}\n";
$message .= "<b>Имя:</b> {$name}\n";
$message .= "<b>Телефон:</b> <code>{$phone}</code>\n";
$message .= "<b>Предварительная цена:</b> {$priceText}";

// 5. Отправка в Telegram через cURL
$url = "https://api.telegram.org/bot{$botToken}/sendMessage";
$postFields = [
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'HTML'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Если на хостинге старые сертификаты

$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 6. Ответ фронтенду
if ($httpCode === 200) {
    echo json_encode(["status" => "success", "message" => "Сообщение отправлено"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Ошибка Telegram API", "details" => $result]);
}