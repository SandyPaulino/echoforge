'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createContentSource } from '@/app/actions/content'
import { Loader2, Upload, FileText, CheckCircle, X } from 'lucide-react'

export function FileUpload() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const acceptedTextTypes = [
    'text/plain',
    'text/markdown',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  const acceptedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ]

  const acceptedTypes = [...acceptedTextTypes, ...acceptedImageTypes]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check file type
      const isTextFile = acceptedTextTypes.includes(selectedFile.type) || selectedFile.name.match(/\.(txt|md)$/i)
      const isImageFile = acceptedImageTypes.includes(selectedFile.type) || selectedFile.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
      
      if (!isTextFile && !isImageFile) {
        setError('Unsupported file type. Please upload a text file, document, or image.')
        setFile(null)
        setImagePreview(null)
        return
      }
      
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB')
        setFile(null)
        setImagePreview(null)
        return
      }
      
      setFile(selectedFile)
      setError(null)
      
      // Generate preview for images
      if (isImageFile) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setImagePreview(null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      const isImageFile = acceptedImageTypes.includes(file.type)
      let content: string
      let contentType: 'text' | 'image' | 'video' | 'audio' | 'url'

      if (isImageFile) {
        // For images, convert to base64 and create a description
        content = await readImageFile(file)
        contentType = 'image'
      } else {
        // For text files, read as text
        content = await readFileContent(file)
        
        // Validate content isn't empty or corrupted
        if (!content || content.trim().length === 0) {
          setError('File appears to be empty or could not be read properly')
          setIsLoading(false)
          return
        }
        contentType = 'text'
      }

      // Remove file extension safely
      const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name

      const result = await createContentSource({
        title: fileNameWithoutExt,
        content_type: contentType,
        source_content: content,
        metadata: {
          original_filename: file.name,
          file_size: file.size,
          file_type: file.type || 'text/plain',
          is_image: isImageFile,
          ...(isImageFile && { image_preview: imagePreview })
        }
      })

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard-routes/generate')
        }, 1500)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to read file content.')
    } finally {
      setIsLoading(false)
    }
  }

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string
          resolve(content)
        } catch (error) {
          reject(new Error('Failed to parse file content'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read file'))
      
      // Use UTF-8 encoding to handle special characters properly
      reader.readAsText(file, 'UTF-8')
    })
  }

  const readImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const base64 = e.target?.result as string
          
          // Create a descriptive text for the image
          const imageDescription = `[Image File: ${file.name}]

This is an image file that can be used as visual content for social media posts.

File Details:
- Filename: ${file.name}
- Size: ${(file.size / 1024).toFixed(2)} KB
- Type: ${file.type}

You can use this image to create engaging social media posts with captions and descriptions that complement the visual content.

Image Data: ${base64}`
          
          resolve(imageDescription)
        } catch (error) {
          reject(new Error('Failed to process image'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read image'))
      reader.readAsDataURL(file)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="file">Upload File</Label>
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg p-8 text-center hover:border-primary transition-colors">
          <input
            id="file"
            type="file"
            accept=".txt,.md,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.webp,.svg,text/plain,text/markdown,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading || success}
          />
          <label
            htmlFor="file"
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                TXT, MD, PDF, DOC, DOCX, JPG, PNG, GIF, WEBP (max 10MB)
              </p>
            </div>
          </label>
        </div>
      </div>

      {file && (
        <div className="space-y-3">
          {imagePreview && (
            <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 dark:border-slate-800">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
            <FileText className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(2)} KB {imagePreview && '• Image'}
              </p>
            </div>
            {!isLoading && !success && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFile(null)
                  setImagePreview(null)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-3 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          File uploaded successfully! Redirecting...
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!file || isLoading || success}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : success ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            Uploaded!
          </>
        ) : (
          'Process File'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Note: Images will be stored with metadata for social media content generation. PDF support is basic.
      </p>
    </form>
  )
}



