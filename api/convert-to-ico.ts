import type { VercelRequest, VercelResponse } from '@vercel/node'
import sharp from 'sharp'
// @ts-ignore - png-to-ico doesn't have TypeScript types
import pngToIco from 'png-to-ico'

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

    // Step 1: Resize and standardize to 256x256 PNG using sharp
    const pngResized = await sharp(pngBuffer)
      .resize(256, 256, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 0 } 
      })
      .png() // Ensure PNG format
      .toBuffer()

    // Step 2: Convert PNG to proper ICO format using png-to-ico
    const icoBuffer = await pngToIco(pngResized)

    // Set proper headers for ICO file download
    res.setHeader('Content-Type', 'image/x-icon')
    res.setHeader('Content-Disposition', 'attachment; filename="pixelicon.ico"')
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Content-Length', icoBuffer.length)

    return res.send(icoBuffer)
  } catch (error) {
    console.error('Conversion error:', error)
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Conversion failed' 
    })
  }
}