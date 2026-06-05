import { useRef, useEffect, useState } from 'react'

interface ZoomedCanvasProps {
  canvas: HTMLCanvasElement | null
  zoomLevel: number
}

export function ZoomedCanvas({ canvas, zoomLevel }: ZoomedCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [scrollPos, setScrollPos] = useState({ left: 0, top: 0 })

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0
      containerRef.current.scrollTop = 0
    }
  }, [zoomLevel])

  const scale = zoomLevel / 100
  const scaledWidth = (canvas?.width || 0) * scale
  const scaledHeight = (canvas?.height || 0) * scale

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    if (containerRef.current) {
      setScrollPos({
        left: containerRef.current.scrollLeft,
        top: containerRef.current.scrollTop
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return
    
    const dx = e.clientX - dragStart.x
    const dy = e.clientY - dragStart.y
    
    containerRef.current.scrollLeft = scrollPos.left - dx
    containerRef.current.scrollTop = scrollPos.top - dy
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-purple-300 flex items-center gap-2 pointer-events-none">
        <span>🔍 {zoomLevel}%</span>
        <span className="w-px h-3 bg-purple-500/50"></span>
        <span>🖱️ Drag to pan</span>
      </div>

      <div
        ref={containerRef}
        className="border border-purple-500/30 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 overflow-auto backdrop-blur-sm"
        style={{
          width: '100%',
          height: '450px',
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollbarWidth: 'thin',
          scrollbarColor: '#4a4a4a #1a1a1a'  // ← BLACK/DARK GRAY colors
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundImage: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: `${scaledWidth}px`,
              height: `${scaledHeight}px`,
              imageRendering: 'pixelated',
              display: 'block',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
            }}
          />
        </div>
      </div>
    </div>
  )
}