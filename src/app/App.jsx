import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import MainContent from './components/MainContent/MainContent.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'

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
