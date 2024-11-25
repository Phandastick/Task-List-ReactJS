import TaskListSection from './TaskListSection.jsx';

import { usernameContext, taskUpdates } from '../../../../contexts/Contexts.jsx';
import styles from './Todo.module.css';
import { useContext, useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Todo(props){
    // const tasks = props.tasks; //array
    const {currentUsername} = useContext(usernameContext);
    const [taskArray, setTaskArray] = useState(null);
    const [listnames, setListnames] = useState(null);
    const { useAddTaskUpdate, setTaskUpdate } = useContext(taskUpdateContext)

    //flag
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
        const url = `${BASE_URL}/api/doGetTasks?username=${currentUsername}`
        const fetchData = async () => {
            try{
                const res = await fetch(url)
                const data = await res.json()
                if(data.status != 200){
                    throw new Error(data.statusText)
                }

                const tasks = data.body.lists
                setTaskArray(tasks)
                setLists(tasks, setListnames);

            } catch(err){
                console.error(err)
                setError(err.message)
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
        </div>
    )
}
