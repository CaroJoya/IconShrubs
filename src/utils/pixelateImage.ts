export function pixelateImage(
  sourceCanvas: HTMLCanvasElement,
  blockSize: number
): HTMLCanvasElement {
  const width = sourceCanvas.width
  const height = sourceCanvas.height

  // If blockSize is 1, just return the original canvas (no pixelation needed)
  if (blockSize === 1) {
    const resultCanvas = document.createElement('canvas')
    resultCanvas.width = width
    resultCanvas.height = height
    const resultCtx = resultCanvas.getContext('2d')
    if (resultCtx) {
      resultCtx.drawImage(sourceCanvas, 0, 0)
    }
    return resultCanvas
  }

  // Create temporary canvas at reduced size
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = Math.max(1, Math.ceil(width / blockSize))
  tempCanvas.height = Math.max(1, Math.ceil(height / blockSize))

  const tempCtx = tempCanvas.getContext('2d')
  if (!tempCtx) {
    return sourceCanvas
  }

  // Draw original image scaled DOWN (creates pixel blocks)
  tempCtx.drawImage(sourceCanvas, 0, 0, tempCanvas.width, tempCanvas.height)

  // Scale back UP to original size (nearest neighbor = sharp pixels)
  const resultCanvas = document.createElement('canvas')
  resultCanvas.width = width
  resultCanvas.height = height

  const resultCtx = resultCanvas.getContext('2d')
  if (!resultCtx) {
    return sourceCanvas
  }

  // CRITICAL: Disable image smoothing for sharp pixel blocks
  resultCtx.imageSmoothingEnabled = false
  resultCtx.drawImage(tempCanvas, 0, 0, width, height)

  return resultCanvas
}