export interface ImageData {
    file: File
    dataUrl: string
    width: number
    height: number
    canvas: HTMLCanvasElement
  }
  
  export interface ValidationError {
    valid: false
    error: string
  }
  
  export interface ValidationSuccess {
    valid: true
    data: ImageData
  }
  
  export type ValidationResult = ValidationError | ValidationSuccess