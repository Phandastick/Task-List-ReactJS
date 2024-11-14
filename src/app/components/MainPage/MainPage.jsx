
import './MainPage.css'
import Navbar from './Navbar/navbar'
import MainContent from './MainContent/mainContent'
import Sidebar from './Sidebar/sidebar'

import { usernameContext } from '../../contexts/Contexts'
import { useContext, useEffect, useState } from 'react'


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
