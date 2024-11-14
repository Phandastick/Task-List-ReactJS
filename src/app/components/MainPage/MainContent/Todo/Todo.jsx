import styles from './Todo.module.css'
import Task from './Task.jsx'
import BtnAddTask from './BtnAddTask'
import ModalAddTask from '../ModalAddTask.jsx'
import { useState } from 'react'

export default function Todo(props){
    const tasks = props.tasks;
    const [isModelOpen, setModalState] = useState(false);
    const openModal = () => {
        setModalState(true)
    }
    const closeModal = () => {
        setModalState(close)
    }

    return (<>
        <div className={styles["Task-wrapper"]} id={styles[`Task-group-${props.groupname}`]}>
            <div className={styles["Task-header"]}>
                {props.groupname}
            </div>
            {
                tasks.map((jsonTask,index)=>{
                    return(
                        <Task data={jsonTask} key={index}/>
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
        />
        </>
    )
}

/*

{
    'groupname': 'Task list\'s name',
    'tasks': [
        {
            'name': 'Taskname',
            'date': 'Task due date',
            'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
        },{
            'name': 'Taskname',
            'date': 'Task due date',
            'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
        },{
            'name': 'Taskname',
            'date': 'Task due date',
            'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
        },{
            'name': 'Taskname',
            'date': 'Task due date',
            'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
        },{
            'name': 'Taskname',
            'date': 'Task due date',
            'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
        }
    ]
}

*/