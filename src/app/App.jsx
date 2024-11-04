import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import MainContent from './components/MainContent/MainContent.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'


function App() {
  const [user, setuser] = useState('error')

  return (
    <div className='app-wrapper'>
      <Sidebar/>
      <hr className = "header-seperator" />
      <Navbar/>
      <hr className="vertical-seperator" />
      <MainContent username={user}/>
    </div>
  )
}

export default App
