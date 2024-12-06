import Daylist from './Daylist';
import BtnAddTask from './BtnAddTask';
import ModalAddTask from './ModalAddTask.jsx';

import styles from './MainContent.module.css'
import { useState, useContext } from 'react'
import { taskUpdateContext } from '@Contexts';

function MainContent() {
    const [useView, setView] = useState('daylist') // daylist
    const [isModelOpen, setModalState] = useState(false);
    const {setTaskUpdate} = useContext(taskUpdateContext)

    const openModal = () => { setModalState(true) }
    const closeModal = () => { setModalState(false) }
    return(
        <div className={styles['main-content']}>
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
                setUpdateTasksFlag = {setTaskUpdate}
            />
        </div>
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
