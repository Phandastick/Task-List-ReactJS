import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/navbar.jsx'
import MainContent from './components/MainContent/mainContent.jsx'
import Sidebar from './components/Sidebar/sidebar.jsx'
import { usernameContext } from './contexts.jsx'


function App() {
  const [user, setuser] = useState('error')

  return (
    <usernameContext.Provider value={user}>
    <div className='app-wrapper'>
      <Sidebar/>
      <hr className = "header-seperator" />
      <Navbar/>
      <hr className="vertical-seperator" />
      <MainContent/>
    </div>
    </usernameContext.Provider>
  )
}

export default App
