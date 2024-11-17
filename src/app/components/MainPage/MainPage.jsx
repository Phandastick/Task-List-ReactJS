
import './MainPage.css'
import Navbar from './Navbar/Navbar.jsx'
import MainContent from './MainContent/mainContent'
import Sidebar from './Sidebar/sidebar'

import { usernameContext } from '../../contexts/Contexts'
import { useContext, useEffect } from 'react'


function MainPage() {
  const {currentUsername, setCurrentUsername} = useContext(usernameContext)
  
  useEffect(() => {
    window.sessionStorage.setItem('username',currentUsername);
  }, [currentUsername])

  return (
          <div className='app-wrapper'>
            <Sidebar/>
            <hr className = "header-seperator" />
            <Navbar/>
            <hr className="vertical-seperator" />
            <MainContent/>
          </div>
  )
}

export default MainPage
