export default function Loading() {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-screen">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-12 bg-emerald-100 dark:bg-emerald-800/30 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-emerald-100 dark:bg-emerald-800/30 rounded w-1/2 mx-auto"></div>
          <div className="h-64 bg-emerald-100 dark:bg-emerald-800/30 rounded"></div>
        </div>
      </div>
    )
  }
  
  