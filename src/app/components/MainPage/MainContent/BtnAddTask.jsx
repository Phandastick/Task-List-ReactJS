import { useContext } from "react";
import styles from "./MainContent.module.css"
import { modalModeContext } from "@/app/contexts/Contexts";

export default function BtnAddTask({ openAddTaskModal }) {
    const {setModalMode} = useContext(modalModeContext)

    const handleAddTask = () => {
        openAddTaskModal();
        setModalMode("New");
    }

    return (
        <button className={styles["addBtn"]}
            onClick={handleAddTask}
        >
            <embed id={styles["embed-addTask"]}
                src='./assets/add_task.svg' />
        </button>
    )
}