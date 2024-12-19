import Daylist from './Daylist';
import BtnAddTask from './BtnAddTask';
import ModalAddTask from './ModalAddTask.jsx';

import styles from './MainContent.module.css'
import { useState, useContext } from 'react'
import { taskUpdateContext,modalStateContext, editModalDataContext } from '@Contexts';

function MainContent() {
    const {setTaskUpdate} = useContext(taskUpdateContext)

    const [useView, setView] = useState('daylist') // daylist
    const [useModelOpen, setModalState] = useState(false);
    const [useEditData, setEditData] = useState(null);

    const openModal = () => { setModalState(true) }
    const closeModal = () => { setModalState(false) }

    return(
        <modalStateContext.Provider value = {{useModelOpen, setModalState}}>
        <editModalDataContext.Provider value = {{useEditData, setEditData}}>
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
                modalState = {useModelOpen}
                setUpdateTasksFlag = {setTaskUpdate}
            />
        </div>
        </editModalDataContext.Provider>
        </modalStateContext.Provider>
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
