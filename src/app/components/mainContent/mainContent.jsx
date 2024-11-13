import { useContext } from 'react'
import Daylist from './Daylist'
import styles from './MainContent.module.css'
import { useState } from 'react'
import { usernameContext } from '../../../providers/AuthContext.jsx';


function chooseMode(mode,onSetLoading){
    if(mode == 'daylist'){
        return <Daylist 
        onSetLoading={onSetLoading}
        />
    }
}

function MainContent() {
    const [listmode, setmode] = useState('daylist')
    const [loading, setloading] = useState(false)
    const username = useContext(usernameContext)

    const onSetLoading = (value)  => {
        setloading(value)
    }

    return <div className={`${styles['main-content']} containers`}>
        {
            chooseMode(listmode,onSetLoading)
        }
        {
            loading && <p>loading...</p>
        }
    </div>
}

export default MainContent
