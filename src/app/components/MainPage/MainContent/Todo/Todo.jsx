import BtnAddTask from './BtnAddTask'
import ModalAddTask from '../ModalAddTask.jsx'
import { useContext, useState, useEffect } from 'react'
import { usernameContext } from '../../../../contexts/Contexts.jsx';
import styles from './Todo.module.css'

export default function Todo(){
    // const tasks = props.tasks; //array
    const [isModelOpen, setModalState] = useState(false);
    const {currentUsername} = useContext(usernameContext);
    const [tasks, setTasks] = useState(null)
    const [updateListsFlag, setUpdateFlag] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const url = `http://localhost:6969/api/doGetTasks?username=${currentUsername}`
        fetch(url)
        const fetchData = async () => {
            try{
                const data = await fetch(url)
                const lists = data.json().body
                setTasks(lists)
            } catch(err){
                console.error(err)
                setError(err)
            } finally {
                setLoading(false)
                setUpdateFlag(false)
            }
        }

        fetchData();
    }, [updateListsFlag])

    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>; // Show error message
    }


    const openModal = () => {
        setModalState(true)
    }
    const closeModal = () => {
        setModalState(close)
    }

    // const getTasks = () => {
    //     const url = `http://localhost:6969/api/doGetTasks?username=${currentUsername}`
    //     console.log('Fetchin GET url', url)
    //     fetch(url)
    //     .then((response) => {
    //         return response.json()
    //     })
    //     .then((data) => {
    //         // console.log('Data Received!: ')
    //         // console.log(data)
    //         setList(data.data)
    //     })
    //     .catch((error) => {
    //         console.error('Fetch error in Todo.jsx:',error)
    //     });
    // }
    return (<>
        <div className={styles["Task-wrapper"]} id={styles[`Task-group-${tasks.groupname}`]}>
            {
                taskLists.map((item,index) => {
                    return(
                    <TaskListSection
                        filter={filterMode}
                        listname={item.groupname}
                        tasks={item.tasks} //array of individual tasks
                        key = {index}
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
