export default function LoadingSkeleton() {
    return (
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8  dark:bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-64  dark:bg-gray-800 rounded mb-6"></div>
          <div className="h-6  dark:bg-gray-800 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4  dark:bg-gray-800 rounded"></div>
            <div className="h-4  dark:bg-gray-800 rounded"></div>
            <div className="h-4  dark:bg-gray-800 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    )
  }