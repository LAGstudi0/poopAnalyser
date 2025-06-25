import { CheckCircle, AlertCircle, Info, FileText } from "lucide-react"

interface AnalysisResultsProps {
  results: {
    bristolType?: {
      type: string
      description: string
    }
    color?: {
      assessment: string
      description: string
    }
    consistency?: {
      rating: string
      description: string
    }
    additionalNotes: string
  }
}

export default function AnalysisResults({ results }: AnalysisResultsProps) {
  const isStructured =
    results.bristolType && results.color && results.consistency

  if (!isStructured) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-6 rounded-xl text-center">
        <p className="text-lg font-semibold mb-2">⚠️ No Stool Detected</p>
        <p className="text-sm">{results.additionalNotes}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
          <CheckCircle className="w-5 h-5" />
          <span className="font-semibold">Analysis Complete</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bristol Stool Type */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Info className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900">Bristol Stool Type</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-blue-800">{results.bristolType?.type}</p>
            <p className="text-blue-700 text-sm">{results.bristolType?.description}</p>
          </div>
        </div>

        {/* Color Assessment */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-amber-500 p-2 rounded-lg">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900">Color</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-amber-800">{results.color?.assessment}</p>
            <p className="text-amber-700 text-sm">{results.color?.description}</p>
          </div>
        </div>

        {/* Consistency */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-green-500 p-2 rounded-lg">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-900">Consistency</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-green-800">{results.consistency?.rating}</p>
            <p className="text-green-700 text-sm">{results.consistency?.description}</p>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-purple-500 p-2 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900">Additional Notes</h3>
          </div>
          <p className="text-purple-700 text-sm leading-relaxed">{results.additionalNotes}</p>
        </div>
      </div>

      {/* Bristol Stool Chart Reference */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Bristol Stool Chart Reference</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
          <div>Type 1-2: Constipated</div>
          <div>Type 3-4: Normal</div>
          <div>Type 5-7: Diarrhea</div>
          <div>Ideal: Type 4</div>
        </div>
      </div>
    </div>
  )
}
