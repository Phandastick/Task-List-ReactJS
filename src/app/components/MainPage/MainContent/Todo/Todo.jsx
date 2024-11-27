import TaskListSection from './TaskListSection.jsx';

import { usernameContext, tasksUpdateContext } from '@Contexts';
import styles from './Todo.module.css';
import { useContext, useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Todo(props){
    // const tasks = props.tasks; //array
    const {currentUsername} = useContext(usernameContext);
    const [taskArray, setTaskArray] = useState([]);
    const [listnames, setListnames] = useState(null);
    const filterMode = props.filterMode

    //flag
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { useTasksUpdate, setTasksUpdate } = useContext(tasksUpdateContext)
    
    useEffect(()=>{
        const url = `${BASE_URL}/api/doGetTasks?username=${currentUsername}`
        const fetchData = async () => {
            try{
                const res = await fetch(url)
                if(res.status != 200){
                    throw new Error(data.statusText)
                }
                const data = await res.json()

                const tasks = data.lists
                // console.log(tasks)
                setTaskArray(tasks)
            } catch(err){
                console.error(err)
                setError(err.message)
            } finally {
                if(useTasksUpdate)
                    setTasksUpdate(false)
                setLoading(false)
            }
        }
        fetchData();
    }, [useTasksUpdate])

    if (isLoading) {
        return <div>Loading tasks, please wait...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error fetching tasks: {error}</p>
            </div>
        );
    }

    return (
        <div className={styles["tasks-container"]}>
            {
                taskArray.map((taskList) => {
                    if(taskList.tasks === undefined || taskList.tasks == [] || taskList.tasks.length < 1){
                        return
                    } else {
                        return(
                            <TaskListSection
                                filter={filterMode}
                                listname={taskList.groupname}
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
