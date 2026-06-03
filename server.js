import express from 'express'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const app = express()
app.use(express.json({ limit: '10mb' }))

app.post('/api/convert-to-ico', async (req, res) => {
  try {
    const { image } = req.body
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'No image data provided' })
    }

    const base64Data = image.includes(',') ? image.split(',')[1] : image
    const pngBuffer = Buffer.from(base64Data, 'base64')

    const pngResized = await sharp(pngBuffer)
      .resize(256, 256, { 
        fit: 'contain', 
        background: { r: 255, g: 255, b: 255, alpha: 0 } 
      })
      .toBuffer()

    const icoBuffer = await pngToIco(pngResized)

    res.setHeader('Content-Type', 'image/x-icon')
    res.setHeader('Content-Disposition', 'attachment; filename="pixelicon.ico"')
    res.send(icoBuffer)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Conversion failed' })
  }
})

app.listen(3001, () => {
  console.log('✅ API server running on http://localhost:3001')
})