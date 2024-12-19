import styles from './Todo.module.css'
import Task from './Task.jsx'


export default function TaskListSection(props) {
    const filter = props.filter;
    const listname = props.listname;
    const tasks = props.tasks;

    return(
    <>
        <div className={styles["Task-header"]}>
            {listname}
        </div>
        {
            tasks.map((jsonTask,index)=>{
                jsonTask.listname = listname
                return(
                    <Task data={jsonTask} key={listname + "-" + index}/>
                )
            })
        }
    </>
    )
}