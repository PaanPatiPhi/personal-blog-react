import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function StylingSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16">
      
      {/* Colors */}
      <section>
        <h2 className="text-h4 mb-6">Colors</h2>

        <p className="text-sm text-brown-600 mb-4">Base</p>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { name: 'Brown 600', color: 'bg-brown-600' },
            { name: 'Brown 500', color: 'bg-brown-500' },
            { name: 'Brown 400', color: 'bg-brown-400' },
            { name: 'Brown 300', color: 'bg-brown-300' },
            { name: 'Brown 200', color: 'bg-brown-200' },
            { name: 'Brown 100', color: 'bg-brown-100' },
            { name: 'White', color: 'bg-white border border-brown-300' },
          ].map((c) => (
            <div key={c.name}>
              <div className={`h-16 rounded-lg ${c.color}`} />
              <p className="text-xs mt-2 text-brown-600">{c.name}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-brown-400 mb-4">Brand</p>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: 'Orange', color: 'bg-brand-orange' },
            { name: 'Green', color: 'bg-brand-green' },
            { name: 'Green Soft', color: 'bg-brand-green-soft' },
            { name: 'Red', color: 'bg-brand-red' },
          ].map((c) => (
            <div key={c.name}>
              <div className={`h-16 rounded-lg ${c.color}`} />
              <p className="text-xs mt-2 text-brown-600">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-h4 mb-6">Fonts</h2>

        <div className="space-y-4 text-brown-600">
          <h1 className="text-h1">Headline 1</h1>
          <h2 className="text-h2">Headline 2</h2>
          <h3 className="text-h3">Headline 3</h3>
          <h4 className="text-h4">Headline 4</h4>

          <p className="text-body">
            Body 1 – This is body text using Poppins.
          </p>
          <p className="text-body text-brown-400">
            Body 2 – Secondary text style.
          </p>
        </div>
      </section>

    </div>
  )
}



function App() {
  const [count, setCount] = useState(0)

  return (
 
    <StylingSection />
  )
}

export default App
