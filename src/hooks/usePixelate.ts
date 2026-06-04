import { useState, useCallback } from 'react'
import { ImageData } from '../types/index'
import { pixelateImage } from '../utils/pixelateImage'

export function usePixelate() {
  const [pixelSize, setPixelSize] = useState(4)  // Changed from 8 to 4 (more reasonable starting point)
  const [pixelatedCanvas, setPixelatedCanvas] = useState<HTMLCanvasElement | null>(null)

  const applyPixelation = useCallback((imageData: ImageData, blockSize: number) => {
    const result = pixelateImage(imageData.canvas, blockSize)
    setPixelatedCanvas(result)
  }, [])

  const updatePixelSize = useCallback((newSize: number, imageData: ImageData) => {
    setPixelSize(newSize)
    applyPixelation(imageData, newSize)
  }, [applyPixelation])

  const reset = useCallback(() => {
    setPixelSize(4)  // Changed from 8 to 4
    setPixelatedCanvas(null)
  }, [])

  return {
    pixelSize,
    pixelatedCanvas,
    updatePixelSize,
    applyPixelation,
    reset
  }
}