import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => { fetch('http://localhost:3000/api/test').then(res => res.json()).then(data => setMessage(data.message)); }, []);

  return (
    <>
      <h1>{message || 'Loading...'}</h1>
    </>
  )
}

export default App
