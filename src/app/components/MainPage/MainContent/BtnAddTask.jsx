import styles from "./Todo/Todo.module.css"

export default function BtnAddTask({openAddTaskModal}){
    const handleAddTask = () => {
        openAddTaskModal();
    }

    return(
        <button className={styles["addBtn"]}
            onClick={handleAddTask}
        >
            <embed id={styles["embed-addTask"]} 
            src='./assets/add_task.svg'/>
        </button>
    )
}