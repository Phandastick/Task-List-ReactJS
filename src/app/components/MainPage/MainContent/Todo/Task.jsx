import { useEffect, useState } from 'react';
import styles from './Todo.module.css'

export default function Task({data}){
    //TODO: Add onclick function to expand
    const [useHover, setHover] = useState(false)

    // useEffect(() => {
    //     const taskGroup = document.getElementById(`Task-group--item-${data.name}`)
    //     taskGroup.addEventListener('mouseenter', () => { setHover(true) })
    //     taskGroup.addEventListener('mouseleave', () => { setHover(false) })
    // } , [])


    return(
        <div className={styles["Task-group"]} id={`Task-grou-item-${data.name}`}>
            <div className={styles["Task-group-details"]}>
                <div className={`${styles["Task-group-item"]} ${styles.checkbox}`} id={styles[`Task-group-item-${data.checkbox}`]}></div>
                <div className={styles["Task-group-item", 'Task-group-name', 'name']} id={styles[`Task-group-item-${data.name}`]}>{data.name}</div>
                <div className={`${styles["Task-group-item"]} ${styles.desc}`} id={styles[`Task-group-item-${data.desc}`]}>{data.desc}</div>
            </div>
            <div className={styles.date}>
                {useHover ? editDeleteButtons(data) : null}
                {data.date}
            </div>
        </div>
    );
};

function editDeleteButtons(data) {

    const handleEdit = () => {
        openModal('edit')
    }

    const handleDelete = () => {
        const payload = {};
    }

    return (
        <>
            <button onClick={handleEdit} id={styles['btn-edit']} class={styles["btn-editdelete"]}></button>
            <button onClick={handleDelete} id={styles['btn-delete']} class={styles["btn-editdelete"]}></button>
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