import { useRef, useEffect } from 'react'

interface ZoomedCanvasProps {
  canvas: HTMLCanvasElement | null
  zoomLevel: number
}

export function ZoomedCanvas({ canvas, zoomLevel }: ZoomedCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvas || !canvasRef.current) return

    canvasRef.current.width = canvas.width
    canvasRef.current.height = canvas.height

    const ctx = canvasRef.current.getContext('2d')
    if (ctx) {
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(canvas, 0, 0)
    }
  }, [canvas])

  const scale = zoomLevel / 100
  const scaledWidth = (canvas?.width || 0) * scale
  const scaledHeight = (canvas?.height || 0) * scale

  return (
    <div
      ref={containerRef}
      className="border border-gray-300 rounded-lg bg-gray-50 overflow-auto"
      style={{
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          imageRendering: 'pixelated',
          cursor: 'grab'
        }}
      />
    </div>
  )
}