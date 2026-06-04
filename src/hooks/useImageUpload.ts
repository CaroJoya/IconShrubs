import { useState } from 'react'
import { ImageData, ValidationError } from '../types/index'
import { validateImage } from '../utils/validateImage'

export function useImageUpload() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showBackgroundPrompt, setShowBackgroundPrompt] = useState(false)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [isRemovingBackground, setIsRemovingBackground] = useState(false)

  // Simple client-side background removal for PNGs
  const removeBackgroundFromPNG = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      
      img.onload = () => {
        // Create canvas
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          URL.revokeObjectURL(url)
          reject(new Error('Could not create canvas context'))
          return
        }
        
        // Draw image
        ctx.drawImage(img, 0, 0)
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data
        
        // Simple background removal: make white/light pixels transparent
        // This is a basic implementation - removes near-white backgrounds
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          
          // If pixel is close to white (background assumption)
          if (r > 200 && g > 200 && b > 200) {
            data[i + 3] = 0 // Set alpha to 0 (transparent)
          }
        }
        
        // Put modified data back
        ctx.putImageData(imageData, 0, 0)
        
        // Convert to blob
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url)
          if (blob) {
            const cleanedFileName = file.name.replace(/\.png$/i, '_nobg.png')
            const newFile = new File([blob], cleanedFileName, { type: 'image/png' })
            resolve(newFile)
          } else {
            reject(new Error('Failed to create blob'))
          }
        }, 'image/png')
      }
      
      img.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Failed to load image'))
      }
      
      img.src = url
    })
  }

  const processImage = async (file: File, shouldRemoveBackground: boolean = false) => {
    setLoading(true)
    setError(null)

    try {
      let processedFile = file
      
      if (shouldRemoveBackground && file.type === 'image/png') {
        setIsRemovingBackground(true)
        
        try {
          processedFile = await removeBackgroundFromPNG(file)
        } catch (bgError) {
          console.error('Background removal failed:', bgError)
          setError('Background removal failed. Using original image.')
          processedFile = file
        } finally {
          setIsRemovingBackground(false)
        }
      }
      
      // Validate and process the image
      const result = await validateImage(processedFile)

      if (result.valid) {
        setImage(result.data)
        setError(null)
      } else {
        setImage(null)
        setError((result as ValidationError).error)
      }
    } catch (err) {
      setError('Failed to process image. Please try again.')
      setImage(null)
    } finally {
      setLoading(false)
      setShowBackgroundPrompt(false)
      setPendingFile(null)
    }
  }

  const handleImageUpload = async (file: File) => {
    // Check if it's a PNG file
    if (file.type === 'image/png') {
      // Show prompt for background removal
      setPendingFile(file)
      setShowBackgroundPrompt(true)
    } else {
      // For non-PNG files, process directly
      await processImage(file, false)
    }
  }

  const handleBackgroundConfirm = async () => {
    if (pendingFile) {
      await processImage(pendingFile, true)
    }
  }

  const handleBackgroundCancel = async () => {
    if (pendingFile) {
      await processImage(pendingFile, false)
    }
  }

  const clearImage = () => {
    setImage(null)
    setError(null)
    setShowBackgroundPrompt(false)
    setPendingFile(null)
  }

  return {
    image,
    error,
    loading,
    isRemovingBackground,
    showBackgroundPrompt,
    handleImageUpload,
    handleBackgroundConfirm,
    handleBackgroundCancel,
    clearImage
  }
}