import TaskListSection from './TaskListSection.jsx';

import { usernameContext, tasksUpdateContext, listsUpdateContext, filterListContext } from '@Contexts';
import styles from './Todo.module.css';
import { useContext, useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Todo(props){
    // const tasks = props.tasks; //array
    const {currentUsername} = useContext(usernameContext);
    const {useFilterList} = useContext(filterListContext);
    const [useTaskArray, setTaskArray] = useState([]);
    const [useFilterTasks, setFilterTasks] = useState([])
    const filterMode = props.filterMode

    //flag
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const { useTasksUpdate, setTasksUpdate } = useContext(tasksUpdateContext)
    const { useListsUpdate, setListsUpdate } = useContext(listsUpdateContext)
    
    useEffect(()=>{
        setError(null)
        const url = `${BASE_URL}/api/doGetTasks?username=${currentUsername}`
        const fetchData = async () => {
            try{
                const res = await fetch(url)
                if(res.status != 200){
                    throw new Error(data.statusText)
                }
                const data = await res.json()

                const tasks = data.lists

                if(tasks.length < 1 || tasks == undefined){
                    setError("No tasks found for " + currentUsername)
                }
                // console.log(tasks)
                setTaskArray(tasks)
                setFilterTasks(tasks)
                debugger
            } catch(err){
                console.error(err)
                setError(err.message)
            } finally {
                if(useTasksUpdate)
                    setTasksUpdate(false)
                if(useListsUpdate){
                    setListsUpdate(false)
                }
                setLoading(false)
            }
        }
        fetchData();
    }, [useTasksUpdate, useListsUpdate])

    useEffect(() => {
        debugger
        if(useFilterList.length > 0) { // if filter list has something

        } else {
            debugger
            setFilterTasks(useTaskArray)
        }
    }, [useFilterList, setTaskArray])

    if (isLoading) {
        return <div>Loading tasks, please wait...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error encountered!: {error}</p>
            </div>
        );
    }

    return (
        <div className={styles["tasks-container"]}>
            {
                useFilterTasks.map((taskList) => {
                    if(taskList.tasks === undefined || taskList.tasks == [] || taskList.tasks.length < 1){
                        return
                    } else {
                        return(
                            <TaskListSection
                                filter={filterMode}
                                groupname={taskList.groupname}
                                tasks={taskList.tasks} //array of individual tasks
                                key = {taskList.groupname}
                            />
                        )
                    }
                })
            }
        </div>
    )
}
