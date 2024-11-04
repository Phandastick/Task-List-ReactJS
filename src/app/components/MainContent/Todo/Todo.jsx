import styles from './Todo.module.css'
import Task from './Task.jsx'

export default function Todo(props){
    const tasks = props.tasks;

    return (
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
        </div>
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