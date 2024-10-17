import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import MainContent from './components/mainContent'
import Sidebar from './components/sidebar'

function App() {

  return (
    <div className='app-wrapper'>
      <Sidebar/>
      <hr className = "header-seperator" />
      <Navbar/>
      <hr className="vertical-seperator" />
      <MainContent className="containers" />
    </div>
  )
}

export default App
