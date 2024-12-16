import { useEffect, useState } from 'react';
import styles from './Todo.module.css'

//TODO: Add ID for each task as a new field

export default function Task({data}){
    //TODO: Add onclick function to expand
    const [useHover, setHover] = useState(false)

    return(
        <div className={styles["Task-group"]} id={`Task-grou-item-${data.name}`}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}>
            <div className={styles["Task-group-details"]}>
                <div className={`${styles["Task-group-item"]} ${styles.checkbox}`} id={styles[`Task-group-item-${data.checkbox}`]}></div>
                <div className={styles["Task-group-item", 'Task-group-name', 'name']} id={styles[`Task-group-item-${data.name}`]}>{data.name}</div>
                <div className={`${styles["Task-group-item"]} ${styles.desc}`} id={styles[`Task-group-item-${data.desc}`]}>{data.desc}</div>
            </div>
            <div className={styles.date}>
                {/* {useHover ? editDeleteButtons(data) : null} */}
                {editDeleteButtons(data, useHover)}
                {data.date}
            </div>
        </div>
    );
};

function editDeleteButtons(data, useHover) {

    const id = data.objectID;

    const handleEdit = () => {
        console.log("Handling editing for task")
        // openModal('edit')
    }
    
    const handleDelete = () => {
        console.log("Handling deleting for task")
        const payload = {}; 
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