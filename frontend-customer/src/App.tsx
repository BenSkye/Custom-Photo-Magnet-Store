import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="responsive-xs sm:responsive-sm md:responsive-md lg:responsive-lg xl:responsive-xl 2xl:responsive-2xl">
        <h1 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-8'>
          Vite + React  + Tailwind CSS  + TypeScript
        </h1>

        <h1 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-8'>
          Vite + React
        </h1>

        <div className="card flex flex-col items-center gap-4 w-full max-w-md">
          <button
            onClick={() => setCount((count) => count + 1)}
            className='px-4 py-2 xs:px-6 xs:py-3 sm:px-8 sm:py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            count is {count}
          </button>

          <p className='text-sm xs:text-base sm:text-lg md:text-xl text-center'>
            Edit <code className='bg-gray-100 px-2 py-1 rounded'>src/App.tsx</code> and save to test HMR
          </p>
        </div>

        <p className="read-the-docs mt-8 text-xs xs:text-sm sm:text-base text-gray-600">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App