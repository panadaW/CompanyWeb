import { NextResponse } from 'next/server'
import { z } from 'zod'
import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

type ContactMessage = z.infer<typeof contactSchema> & {
  id: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), '..', 'Server', 'data')
const DATA_FILE = path.join(DATA_DIR, 'messages.json')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true })
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8')
  }
}

async function readMessages(): Promise<ContactMessage[]> {
  await ensureDataFile()
  const content = await fs.readFile(DATA_FILE, 'utf-8')
  return JSON.parse(content)
}

async function writeMessages(messages: ContactMessage[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2), 'utf-8')
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const keyword = searchParams.get('q')

    const messages = await readMessages()
    const filtered = messages.filter((message) => {
      const matchEmail = email ? message.email === email : true
      const matchKeyword = keyword
        ? [message.name, message.email, message.message].some((field) =>
            field.toLowerCase().includes(keyword.toLowerCase())
          )
        : true
      return matchEmail && matchKeyword
    })

    return NextResponse.json(
      {
        message: '查询成功',
        data: filtered,
        total: filtered.length,
      },
      { status: 200, headers: corsHeaders }
    )
  } catch {
    return NextResponse.json(
      { error: '查询失败' },
      { status: 500, headers: corsHeaders }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    const existing = await readMessages()
    const newMessage: ContactMessage = {
      ...validatedData,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    }

    await writeMessages([newMessage, ...existing])

    // 模拟API延迟
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json(
      { message: '留言提交成功', data: newMessage },
      { status: 200, headers: corsHeaders }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '数据验证失败', details: error.errors },
        { status: 400, headers: corsHeaders }
      )
    }

    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500, headers: corsHeaders }
    )
  }
}





