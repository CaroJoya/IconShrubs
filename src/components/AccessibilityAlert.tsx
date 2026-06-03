import { useEffect, useRef } from 'react'

interface AccessibilityAlertProps {
  message: string
  type: 'success' | 'error' | 'info'
  visible: boolean
}

export function AccessibilityAlert({
  message,
  type,
  visible
}: AccessibilityAlertProps) {
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible && alertRef.current) {
      // Announce to screen readers
      alertRef.current.focus()
    }
  }, [visible, message])

  if (!visible) return null

  const roleMap = {
    success: 'status',
    error: 'alert',
    info: 'status'
  } as const

  return (
    <div
      ref={alertRef}
      role={roleMap[type]}
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}