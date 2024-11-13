import { useContext, useEffect, useState } from 'react'
import './MainPage.css'
import Navbar from './components/Navbar/navbar'
import MainContent from './components/MainContent/mainContent'
import Sidebar from './components/Sidebar/sidebar'
import { usernameContext } from './contexts/Contexts'


function MainPage() {
  const {username, setUsername} = useContext(usernameContext)

  useEffect(() => {
    window.sessionStorage.setItem('username',username);
  }, [username])

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
