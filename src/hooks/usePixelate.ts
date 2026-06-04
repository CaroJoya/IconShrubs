import { useState, useCallback } from 'react'
import { ImageData } from '../types/index'
import { pixelateImage } from '../utils/pixelateImage'

export function usePixelate() {
  const [pixelSize, setPixelSize] = useState(4)
  const [usePixelation, setUsePixelation] = useState(true) // New state
  const [pixelatedCanvas, setPixelatedCanvas] = useState<HTMLCanvasElement | null>(null)

  const applyPixelation = useCallback((imageData: ImageData, blockSize: number) => {
    const result = pixelateImage(imageData.canvas, blockSize)
    setPixelatedCanvas(result)
  }, [])

  const updatePixelSize = useCallback((newSize: number, imageData: ImageData) => {
    setPixelSize(newSize)
    if (usePixelation) {
      applyPixelation(imageData, newSize)
    }
  }, [usePixelation, applyPixelation])

  const togglePixelation = useCallback((enabled: boolean, imageData: ImageData) => {
    setUsePixelation(enabled)
    if (enabled) {
      applyPixelation(imageData, pixelSize)
    } else {
      // Use original canvas when pixelation is off
      const originalCanvas = document.createElement('canvas')
      originalCanvas.width = imageData.canvas.width
      originalCanvas.height = imageData.canvas.height
      const ctx = originalCanvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(imageData.canvas, 0, 0)
      }
      setPixelatedCanvas(originalCanvas)
    }
  }, [pixelSize, applyPixelation])

  const reset = useCallback(() => {
    setPixelSize(4)
    setUsePixelation(true)
    setPixelatedCanvas(null)
  }, [])

  return {
    pixelSize,
    pixelatedCanvas,
    usePixelation,
    updatePixelSize,
    togglePixelation,
    applyPixelation,
    reset
  }
}