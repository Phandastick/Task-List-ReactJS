import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import MainContent from './components/mainContent/MainContent'
import Sidebar from './components/sidebar/Sidebar'
import { usernameContext } from './contexts'


function App() {
  const [username, setUsername] = useState(null);

  return (
    <usernameContext.Provider value={{username, setUsername}}>
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
