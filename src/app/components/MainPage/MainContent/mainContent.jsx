import Daylist from './Daylist';
import BtnAddTask from './BtnAddTask';
import ModalAddTask from './ModalAddTask.jsx';

import styles from './MainContent.module.css'
import { useState, useEffect, useContext } from 'react'
import { taskUpdateContext } from '../../../contexts/Contexts.jsx'

function MainContent() {
    const [useView, setmode] = useState('daylist') // daylist
    const [isModelOpen, setModalState] = useState(false);
    const [useAddTaskUpdate, setTaskUpdate] = useState(false);


    const openModal = () => { setModalState(true) }
    const closeModal = () => { setModalState(false) }
    return(
    // <taskUpdateContext.Provider value={{useAddTaskUpdate, setTaskUpdate}}>
        <>
        <div className={styles["Task-wrapper"]} id='Task-wrapper'>
            {
                getView(useView)
            }
            <BtnAddTask 
                openAddTaskModal={openModal}
            />
        </div>
        <ModalAddTask 
            setModalState = {setModalState}
            modalState = {isModelOpen}
            updateFlag = {setTaskUpdate}
        />
        </>
    // </taskUpdateContext.Provider>
    )
}

const getView = (useView) => {
    if(useView == 'daylist'){//filter by date
        return <div className={`${styles['main-content']} containers`}>
            <Daylist />
        </div>
    }

    return <div>Error loading div! please wait...</div>
}


export default MainContent
