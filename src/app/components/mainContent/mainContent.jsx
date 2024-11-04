import Daylist from './Daylist'
import styles from './MainContent.module.css'
import { useState } from 'react'


function chooseMode(mode,username,onSetLoading){
    if(mode == 'daylist'){
        return <Daylist 
        username={username}
        onSetLoading={onSetLoading}
        />
    }
}

function MainContent({username}) {
    const [listmode, setmode] = useState('daylist')
    const [loading, setloading] = useState(false)

    const onSetLoading = (value)  => {
        setloading(value)
    }

    return <div className={`${styles['main-content']} containers`}>
        {
            chooseMode(listmode,username,onSetLoading)
        }
        
        {
            loading && <p>loading...</p>
        }
    </div>
}

export default MainContent
