import { NextResponse } from 'next/server'
import { readFile, readdir } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    const leadsDir = join(process.cwd(), 'leads')
    const files = await readdir(leadsDir).catch(() => [])
    
    let allLeads: any[] = []
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const content = await readFile(join(leadsDir, file), 'utf-8')
          const leads = JSON.parse(content)
          if (Array.isArray(leads)) {
            allLeads.push(...leads)
          }
        } catch (e) {
          console.error(`Ошибка чтения ${file}:`, e)
        }
      }
    }
    
    // Сортируем по дате (новые сверху)
    allLeads.sort((a, b) => {
      const dateA = new Date(a.timestamp || 0).getTime()
      const dateB = new Date(b.timestamp || 0).getTime()
      return dateB - dateA
    })
    
    return NextResponse.json({ leads: allLeads })
  } catch (error) {
    console.error('Ошибка:', error)
    return NextResponse.json({ leads: [] })
  }
}
