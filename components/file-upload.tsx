"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Camera } from "lucide-react"

interface FileUploadProps {
  onFileSelect: (file: File) => void
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      onFileSelect(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
        isDragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Upload className="w-8 h-8 text-indigo-600" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload Your Photo</h3>
          <p className="text-gray-500 mb-4">Drag and drop an image here, or click to select</p>
          <p className="text-sm text-gray-400">Supports JPG, PNG, and other image formats</p>
        </div>

        <div className="flex justify-center">
          <Camera className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  )
}
