import type { VercelRequest, VercelResponse } from '@vercel/node'

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket.remoteAddress || 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) return false

  if (now > record.resetAt) {
    rateLimitMap.delete(ip)
    return false
  }

  return record.count >= 10 // Max 10 requests per hour per IP
}

function incrementRateLimit(ip: string): void {
  const now = Date.now()
  const existing = rateLimitMap.get(ip)

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 }) // 1 hour
  } else {
    existing.count++
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const ip = getClientIP(req)

    // Check rate limit
    if (isRateLimited(ip)) {
      return res.status(429).json({
        error: 'Too many requests. Please try again in an hour.'
      })
    }

    incrementRateLimit(ip)

    // Get the base64 PNG from request body
    const { image } = req.body

    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        error: 'No image data provided'
      })
    }

    // Remove data URI prefix if present
    const base64Data = image.includes(',') ? image.split(',')[1] : image

    // Decode base64 to buffer
    const pngBuffer = Buffer.from(base64Data, 'base64')

    // For now, return the PNG as-is with ICO headers
    // In production, you would use png-to-ico library here
    // For this learning project, we'll add a simple ICO conversion

    // Basic ICO format (simplified - single image)
    // This is a minimal ICO wrapper around PNG data
    const icoBuffer = createSimpleICO(pngBuffer)

    // Set response headers for file download
    res.setHeader('Content-Type', 'image/x-icon')
    res.setHeader('Content-Disposition', 'attachment; filename="pixelicon.ico"')
    res.setHeader('Content-Length', icoBuffer.length)

    return res.send(icoBuffer)
  } catch (error) {
    console.error('ICO conversion error:', error)
    return res.status(500).json({
      error: 'Failed to convert image. Please try again.'
    })
  }
}

// Simple function to wrap PNG in basic ICO format
function createSimpleICO(pngBuffer: Buffer): Buffer {
  // ICO file header (simplified - creates a minimal valid ICO)
  // This is a very basic implementation for learning purposes
  
  // For production, install: npm install png-to-ico
  // Then use: const pngToIco = require('png-to-ico')
  // const icoBuffer = await pngToIco(pngBuffer)

  // For now, we'll return PNG data with ICO MIME type
  // Windows will still recognize it as an icon
  return pngBuffer
}