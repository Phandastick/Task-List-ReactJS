import BtnAddTask from './BtnAddTask'
import ModalAddTask from '../ModalAddTask.jsx'
import { useContext, useState, useEffect } from 'react'
import { usernameContext } from '../../../../contexts/Contexts.jsx';
import styles from './Todo.module.css'

export default function Todo(){
    // const tasks = props.tasks; //array
    const [isModelOpen, setModalState] = useState(false);
    const {currentUsername} = useContext(usernameContext);
    const [taskArray, setTaskArray] = useState([])
    const [updateListsFlag, setUpdateFlag] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState([null]);
    
    useEffect(()=>{
        const url = `http://localhost:6969/api/doGetTasks?username=${currentUsername}`
        const fetchData = async () => {
            try{
                fetch(url)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    //returns array
                    const tasks = data.body.lists
                    setTaskArray(tasks)
                    setLoading(false)
                })
            } catch(err){
                console.error(err)
                setError(err)
            } finally {
                setUpdateFlag(false)
            }
        }
        fetchData();
    }, [updateListsFlag])

    const openModal = () => {
        setModalState(true)
    }
    const closeModal = () => {
        setModalState(false)
    }

    if (error) {
        return (
            <div>
                <p>Error fetching tasks: {error.message}</p>
            </div>
        );
    }
    
    if (isLoading) {
        return <div>Loading tasks, please wait...</div>;
    }

    return (<>
        <div className={styles["Task-wrapper"]}>
            {
                taskArray.map((item) => {
                    return(
                    <TaskListSection
                        filter={filterMode}
                        listname={item.groupname}
                        tasks={item.tasks} //array of individual tasks
                        key = {item.groupname}
                    />
                    )
                })
            }
            <BtnAddTask 
                openAddTaskModal={openModal}
            />
        </div>
        <ModalAddTask 
            setModalState = {setModalState}
            modalState = {isModelOpen}
            listName = {listName}
            updateFlag = {setUpdateFlag}
        />
        </>
    )
}
