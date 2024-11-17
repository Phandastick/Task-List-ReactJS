import BtnAddTask from './BtnAddTask';
import ModalAddTask from '../ModalAddTask.jsx';
import TaskListSection from './TaskListSection.jsx';

import { usernameContext } from '../../../../contexts/Contexts.jsx';
import styles from './Todo.module.css';
import { useContext, useState, useEffect } from 'react';

export default function Todo(){
    // const tasks = props.tasks; //array
    const {currentUsername} = useContext(usernameContext);
    const [taskArray, setTaskArray] = useState(null);
    const [listnames, setListnames] = useState(null);

    //flag
    const [isModelOpen, setModalState] = useState(false);
    const [updateListsFlag, setUpdateFlag] = useState(false);
    const [filterMode, setFiltermode] = useState("Day");
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const url = `http://localhost:6969/api/doGetTasks?username=${currentUsername}`
        const fetchData = async () => {
            try{
                const res = await fetch(url)
                const data = await res.json()

                const tasks = data.body.lists
                setTaskArray(tasks)


                setLists(tasks, setListnames);

            } catch(err){
                console.error(err)
                setError(err)
            } finally {
                setUpdateFlag(false)
                setLoading(false)
            }
        }
        fetchData();
    }, [updateListsFlag])

    const setLists = (taskList, setList) => {
        const lists = [];
        taskList.forEach(list => {
            lists.push(list.groupname)
        });
        setList(lists)
    }

    const openModal = () => { setModalState(true) }
    const closeModal = () => { setModalState(false) }
    
    if (isLoading) {
        return <div>Loading tasks, please wait...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error fetching tasks: {error.message}</p>
            </div>
        );
    }

    return (<>
        <div className={styles["Task-wrapper"]} id='Task-wrapper'>
            {
                taskArray.map((item) => {
                    if(item.tasks === undefined || item.tasks == ""){
                        return
                    }
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
            listName = {listnames[0]}
            updateFlag = {setUpdateFlag}
            lists = {listnames}
        />
        </>
    )
}
