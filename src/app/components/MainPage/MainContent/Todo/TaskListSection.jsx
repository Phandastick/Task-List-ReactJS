import styles from './Todo.module.css'
import Task from './Task.jsx'


export default function TaskListSection({filter, listname, tasks}) {

    return(
    <>
        <div className={styles["Task-header"]}>
            {listname}
        </div>
        {
            tasks.map((jsonTask,index)=>{
                return(
                    <Task data={jsonTask} key={index}/>
                )
            })
        }
    </>
    )
}