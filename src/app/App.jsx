import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import MainContent from './components/MainContent/MainContent'
import Sidebar from './components/Sidebar/Sidebar'
import { usernameContext } from './contexts'


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
