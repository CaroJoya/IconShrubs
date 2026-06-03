import type { VercelRequest, VercelResponse } from '@vercel/node'
import sharp from 'sharp'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { image } = req.body

    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'No image data provided' })
    }

    const base64Data = image.includes(',') ? image.split(',')[1] : image
    const pngBuffer = Buffer.from(base64Data, 'base64')

    // Convert PNG to ICO using sharp
    const icoBuffer = await sharp(pngBuffer)
      .resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toBuffer()

    res.setHeader('Content-Type', 'image/x-icon')
    res.setHeader('Content-Disposition', 'attachment; filename="pixelicon.ico"')
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')

    return res.send(icoBuffer)
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ error: 'Conversion failed' })
  }
}
