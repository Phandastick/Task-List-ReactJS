import { useContext, useEffect, useState } from 'react';
import styles from './Todo.module.css'
import { editModalDataContext, modalModeContext, modalStateContext, tasksUpdateContext, usernameContext } from '@/app/contexts/Contexts';

const BASE_URL = import.meta.env.VITE_BASE_URL

//TODO: Add ID for each task as a new field

export default function Task(props){
    const {setModalState} = useContext(modalStateContext);
    const {setModalMode} = useContext(modalModeContext)
    const {setEditData} = useContext(editModalDataContext);
    const {currentUsername} = useContext(usernameContext);
    const {setTasksUpdate} = useContext(tasksUpdateContext);

    const [useHover, setHover] = useState(false)
    
    const data = props.data
    data.username = currentUsername;

    const formatDate = date => {
        let dateArray = date.split("T")
        let formattedDate = `${dateArray[0]}`;
        
        return formattedDate
    }

    const formattedDate = formatDate(data.date)

    return(
        <div className={styles["Task-group"]} id={`Task-group-item-${data.name}`}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}>
            <div className={styles["Task-group-details"]}>
                <div className={`${styles["Task-group-item"]} ${styles.checkbox}`} id={styles[`Task-group-item-${data.checkbox}`]}></div>
                <div className={styles["Task-group-item", 'Task-group-name', 'name']} id={styles[`Task-group-item-${data.name}`]}>{data.name}</div>
                <div className={`${styles["Task-group-item"]} ${styles.desc}`} id={styles[`Task-group-item-${data.desc}`]}
                    hidden={!useHover}>{data.desc}</div>
            </div>
            <div className={styles.date}>
                {editDeleteButtons(data, useHover, setModalState, setEditData, setModalMode, setTasksUpdate)}
                {formattedDate}
            </div>
        </div>
    );
};

function editDeleteButtons(data, useHover, setModalState, setEditData, setModalMode, setTasksUpdate) {
    const ID = data.ID;
    let taskData = {
        name: data.name,
        desc: data.desc,
        date: data.date,
        taskID: ID,
        groupname: data.groupname,
        username: data.username
    }

    const handleEdit = () => {
        console.log("Handling editing for task")
        setModalMode("Edit")
        setModalState(true);
        setEditData(taskData)
    }
    
    const handleDelete = () => {
        console.log("Handling deleting for task")
        deleteData(taskData);
    }

    async function deleteData(task) {
        const {taskID, groupname, username, name} = task;

        const url = `${BASE_URL}/api/doDeleteTask/${taskID}`
        const payload = {
            username: username,
            groupname: groupname,
            taskname: name
        }

        const res = await fetch(url, {
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
            method: "DELETE"
        })
        if(res.status == 200){ //deletion successful
            setTasksUpdate(true);
        }
    }

    return (
        <>
            <button onClick={handleEdit} id={styles['btn-edit']} className={styles["btn-edit"]} hidden={!useHover}>
                <embed src='/assets/edit.svg' id={styles['embed-edit']}/>
            </button>
            <button onClick={handleDelete} id={styles['btn-delete']} className={styles["btn-delete"]} hidden={!useHover}>
                <embed src='/assets/delete.svg' id={styles['embed-delete']}/>
            </button>
        </>
    )
}

/*

my eyes hurt

{
    'name': 'Taskname',
    'date': 'Task due date',
    'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
}
*/