"use client"

import { useState } from "react"
import FileUpload from "@/components/file-upload"
import ImagePreview from "@/components/image-preview"
import AnalysisResults from "@/components/analysis-results"
import LoadingSpinner from "@/components/loading-spinner"

export default function PoopAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setResults(null)
  }

  const extract = (text: string, label: string): string => {
    const patterns = [
      new RegExp(`${label}[:\\-]?\\s*(.+?)\\.?\\s*(\\n|$)`, "i"),
      new RegExp(`The .*? is (.+?)\\.?\\s*(\\n|$)`, "i")
    ]
    for (const pattern of patterns) {
      const match = text.match(pattern)
      if (match) return match[1].trim()
    }
    return ""
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return
    setIsAnalyzing(true)

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(",")[1]

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64Image: base64 }),
        })

        const data = await res.json()

        if (
          !data.result ||
          data.result.toLowerCase().includes("no stool") ||
          data.result.toLowerCase().includes("could not identify") ||
          data.result.toLowerCase().includes("i can't assist")
        ) {
          setResults({
            additionalNotes: "⚠️ No stool was detected in this image. Please try a clearer photo.",
          })
          return
        }

        const text = data.result as string
        console.log("🧠 AI RESPONSE:\n", text)

        const parsed = JSON.parse(data.result)
        setResults(parsed)
        
        

        setResults(parsed)
      } catch (err) {
        console.error(err)
        setResults({ additionalNotes: "❌ Error reaching the AI service. Please try again." })
      } finally {
        setIsAnalyzing(false)
      }
    }

    reader.readAsDataURL(selectedFile)
  }

  const handleReset = () => {
    setSelectedFile(null)
    setResults(null)
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Poop Analyzer 💩</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Upload a photo of your stool to get feedback based on the Bristol Stool Chart. No data is stored.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {!selectedFile && !isAnalyzing && !results && <FileUpload onFileSelect={handleFileSelect} />}

          {selectedFile && !isAnalyzing && !results && (
            <div className="space-y-6">
              <ImagePreview file={selectedFile} />
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleAnalyze}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Analyze My Poop
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {isAnalyzing && <LoadingSpinner />}

          {results && !isAnalyzing && (
            <div className="space-y-6">
              <AnalysisResults results={results} />
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
                >
                  Analyze Another Sample
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="text-yellow-800 text-sm font-medium text-center">
            ⚠️ This is for educational purposes only. Not medical advice. Consult a healthcare professional for medical
            concerns.
          </p>
        </div>
      </div>
    </div>
  )
}
