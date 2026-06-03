import { useState } from 'react'
import { ImageData, ValidationError } from '../types/index'
import { validateImage } from '../utils/validateImage'

export function useImageUpload() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (file: File) => {
    setLoading(true)
    setError(null)

    const result = await validateImage(file)

    if (result.valid) {
      setImage(result.data)
      setError(null)
    } else {
      setImage(null)
      setError((result as ValidationError).error)
    }

    setLoading(false)
  }

  const clearImage = () => {
    setImage(null)
    setError(null)
  }

  return {
    image,
    error,
    loading,
    handleImageUpload,
    clearImage
  }
}