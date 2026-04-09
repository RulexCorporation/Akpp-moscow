import { NextResponse } from 'next/server'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Сохраняем заявку в файл
    const leadsDir = join(process.cwd(), 'leads')
    const today = new Date().toISOString().split('T')[0]
    const logFile = join(leadsDir, `${today}.json`)
    
    try {
      await mkdir(leadsDir, { recursive: true })
      
      // Читаем существующие заявки
      let leads = []
      try {
        const content = await readFile(logFile, 'utf-8')
        leads = JSON.parse(content)
      } catch (e) {
        leads = []
      }
      
      // Добавляем новую заявку
      leads.push({
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: request.headers.get('user-agent') || 'unknown'
      })
      
      // Сохраняем обратно
      await writeFile(logFile, JSON.stringify(leads, null, 2))
      
    } catch (fileError) {
      console.error('Ошибка записи файла:', fileError)
    }
    
    return NextResponse.json({ 
      status: "success", 
      message: "Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время."
    })
    
  } catch (error) {
    console.error('Ошибка:', error)
    return NextResponse.json({ 
      status: "success", 
      message: "Спасибо! Ваша заявка принята."
    })
  }
}
