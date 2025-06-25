export default function LoadingSpinner() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center space-x-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Analyzing...</h3>
          <p className="text-gray-500 mt-1">Our AI is examining your sample</p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <p className="text-blue-700 text-sm">
          💡 Did you know? The Bristol Stool Chart was developed in 1997 at the University of Bristol as a medical aid
          to classify stool forms.
        </p>
      </div>
    </div>
  )
}
