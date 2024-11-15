import { useContext } from 'react'
import Daylist from './Daylist'
import styles from './MainContent.module.css'
import { useState } from 'react'


function displayMode(mode){
    if(mode == 'daylist'){
        return <Daylist 
        />
    }
}

function MainContent() {
    const [listmode, setmode] = useState('daylist') // daylist
    return <div className={`${styles['main-content']} containers`}>
        {
            displayMode(listmode)
        }
    </div>
}

export default MainContent
