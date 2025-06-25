"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ImagePreviewProps {
  file: File
}

export default function ImagePreview({ file }: ImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string>("")

  useEffect(() => {
    const url = URL.createObjectURL(file)
    setImageUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [file])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 text-center">Image Preview</h3>

      <div className="relative bg-gray-100 rounded-xl overflow-hidden">
        <img src={imageUrl || "/placeholder.svg"} alt="Uploaded stool sample" className="w-full h-64 object-contain" />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
          <X className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
      </div>
    </div>
  )
}
