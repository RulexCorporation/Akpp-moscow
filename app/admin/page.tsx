'use client'

import { useState, useEffect } from 'react'

export default function AdminPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  const login = () => {
    if (password === 'admin123') {
      setAuthenticated(true)
      fetchLeads()
    } else {
      alert('Неверный пароль')
    }
  }

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/get-leads')
      const data = await response.json()
      setLeads(data.leads || [])
    } catch (error) {
      console.error('Ошибка загрузки:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div style={{
        all: 'initial',
        display: 'block',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f2f5'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            width: '350px'
          }}>
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#000000'
            }}>
              Вход в админ-панель
            </h1>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && login()}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginBottom: '15px',
                fontSize: '14px',
                color: '#000000'
              }}
            />
            <button
              onClick={login}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      all: 'initial',
      display: 'block',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#000000',
            margin: 0
          }}>
            Заявки с сайта ({leads.length})
          </h1>
          <button
            onClick={fetchLeads}
            style={{
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Обновить
          </button>
        </div>

        {loading ? (
          <div style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            textAlign: 'center',
            borderRadius: '8px',
            color: '#000000'
          }}>
            Загрузка...
          </div>
        ) : leads.length === 0 ? (
          <div style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            textAlign: 'center',
            borderRadius: '8px',
            color: '#000000'
          }}>
            Нет заявок
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {leads.map((lead, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: '1px solid #e0e0e0'
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '15px'
                }}>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold'
                    }}>
                      Имя
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#000000',
                      fontWeight: '500'
                    }}>
                      {lead.name || '—'}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold'
                    }}>
                      Телефон
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#000000',
                      fontWeight: '500'
                    }}>
                      <a href={`tel:${lead.phone}`} style={{
                        color: '#007bff',
                        textDecoration: 'none'
                      }}>
                        {lead.phone || '—'}
                      </a>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold'
                    }}>
                      Бренд
                    </div>
                    <div style={{
                      fontSize: '16px',
                      color: '#000000',
                      fontWeight: '500'
                    }}>
                      {lead.brand || '—'}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold'
                    }}>
                      Стоимость
                    </div>
                    <div style={{
                      fontSize: '18px',
                      color: '#28a745',
                      fontWeight: 'bold'
                    }}>
                      {lead.total ? `${lead.total.toLocaleString()} ₽` : '—'}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold'
                    }}>
                      Источник
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#000000'
                    }}>
                      {lead.source || '—'}
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: '12px',
                      color: '#666666',
                      marginBottom: '5px',
                      textTransform: 'uppercase',
                      fontWeight: 'bold'
                    }}>
                      Дата и время
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#000000'
                    }}>
                      {lead.timestamp ? new Date(lead.timestamp).toLocaleString('ru-RU') : '—'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
