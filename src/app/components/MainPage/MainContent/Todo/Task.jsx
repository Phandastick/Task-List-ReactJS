import styles from './Todo.module.css'

export default function Task({data}){
    //TODO: Add onclick function to expand

    return(
        <div className={styles["Task-group"]} id={`Task-group--item-${data.name}`}>
            <div className={styles["Task-group-details"]}>
                <div className={`${styles["Task-group-item"]} ${styles.checkbox}`} id={styles[`Task-group-item-${data.checkbox}`]}></div>
                <div className={styles["Task-group-item", 'Task-group-name', 'name']} id={styles[`Task-group-item-${data.name}`]}>{data.name}</div>
                <div className={`${styles["Task-group-item"]} ${styles.desc}`} id={styles[`Task-group-item-${data.desc}`]}>{data.desc}</div>
            </div>
            <div className={styles.date}>{data.date}</div>
        </div>
    );
};

/*

my eyes hurt

{
    'name': 'Taskname',
    'date': 'Task due date',
    'desc': 'Long text whch should decribe the name of the task which is to be tracked and accomplished'
}
*/