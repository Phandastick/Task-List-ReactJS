import styles from './Todo.module.css'
import Task from './Task.jsx'


export default function TaskListSection(props) {
    const filter = props.filter;
    const groupname = props.groupname;
    const tasks = props.tasks;

    return(
    <>
        <div className={styles["Task-header"]}>
            {groupname}
        </div>
        {
            tasks.map((jsonTask,index)=>{
                jsonTask.groupname = groupname
                return(
                    <Task data={jsonTask} key={groupname + "-" + index}/>
                )
            })
        }
    </>
    )
}