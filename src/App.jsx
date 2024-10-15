import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="header navbar containers"></div>
      <hr className = "header-seperator"> </hr>
      <div className="sidebar containers"></div>
      <hr className="vertical-seperator"></hr>
      <div className="main-content containers"></div>
    </>
  )
}

export default App
