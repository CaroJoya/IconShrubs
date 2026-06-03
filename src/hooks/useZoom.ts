import { useState, useCallback } from 'react'

export function useZoom(maxZoom: number = 400) {
  const [zoomLevel, setZoomLevel] = useState(100)

  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => {
      const next = prev + 50
      return next > maxZoom ? maxZoom : next
    })
  }, [maxZoom])

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => {
      const next = prev - 50
      return next < 100 ? 100 : next
    })
  }, [])

  const resetZoom = useCallback(() => {
    setZoomLevel(100)
  }, [])

  const canZoomIn = zoomLevel < maxZoom
  const canZoomOut = zoomLevel > 100

  return {
    zoomLevel,
    zoomIn,
    zoomOut,
    resetZoom,
    canZoomIn,
    canZoomOut
  }
}