import { useEffect, useState } from 'react'
import './MainPage.css'
import Navbar from './components/Navbar/navbar'
import MainContent from './components/MainContent/mainContent'
import Sidebar from './components/Sidebar/sidebar'
import { usernameContext } from '../providers/AuthContext'


function MainPage() {
  const [username, setUsername] = useState('error');
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    window.sessionStorage.setItem('username',username);
  }, [username])

  return (
    <usernameContext.Provider value={{username, setUsername}}>
        {
          <div className='app-wrapper'>
            <Sidebar/>
            <hr className = "header-seperator" />
            <Navbar/>
            <hr className="vertical-seperator" />
            <MainContent/>
          </div>
        }
    </usernameContext.Provider>
  )
}

export default MainPage
