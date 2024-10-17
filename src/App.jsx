import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import MainContent from './components/mainContent'
import Sidebar from './components/sidebar'

function App() {

  return (
    <>
      <Navbar className="containers" />
      <hr className = "header-seperator" />
      <Sidebar className = "containers" />
      <hr className="vertical-seperator" />
      <MainContent className="containers" />
    </>
  )
}

export default App
