import styles from './Sidebar.module.css'
import { useEffect, useState } from 'react'

function listFactory(text, icon, className, idName){
    return <div id = {idName} className={styles['sidebar-item']}>
        <embed 
            className={`${className} ${styles['sidebar-item-icon']}`} 
            src={`/assets/${icon}.svg`} />

        <a className={`${className} sidebar-item-text`}>{text}</a>
    </div>  
}


function Sidebar () {

    const [list, setlist] = useState([])

    try {
        // const port = 6969
        const url = `/doGetDefaultLists`
        
        useEffect(() => {
            fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log('Data Received!: ')
                console.log(data)
                setlist(data.data)
            })
            .catch((error) => console.log(error)
            );
        }, [])
    } catch (err){
        console.error(err.stack)
    }

    return (
        <div className={`${styles.sidebar} containers`}>
            <h1>To-do List</h1>
            <div className={styles["sidebar-presets"]}>
                {
                    list.map((item, index)=>{
                        const className = `sidebar-preset-${index+1}`;
                        return listFactory(item.name, `default/${item.file}`, className, className)
                    })
                }
            </div>
            <hr className={styles["sidebar-divider"]}></hr>
            <div className={styles["sidebar-custom"]}></div>
        </div>
    );
};

export default Sidebar;