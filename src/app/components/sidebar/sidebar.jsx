
import { Tooltip } from 'react-tooltip';
import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'
import { useState } from 'react';

export default function Sidebar() {
    const [isModalOpen, setModal] = useState(false);
    const [username, setuser] = useState('lucas')
    // console.log(username);


    function openModal(){
        console.log('Opening modal...')
        setModal(true)
    }

    function closeModal(){
        console.log('Closing modal...')
        setModal(false)
    }

    function focusField(){
        let tf = document.getElementById('input-addList');
        tf.focus()
    }


    return (
        <>
            <div className={`${styles.sidebar} containers`}>
                <h1>To-do List</h1>
                <SidebarPresets />
                <div className={styles["sidebar-divider"]}>
                    <hr className={styles["sidebar-divider-line"]} />
                    <button className={styles["sidebar-addBtn"]}
                        data-tooltip-id='add-list-tooltip'
                        onClick={focusField}
                    >
                        <embed id={styles["addBtn"]} 
                        src='./assets/add_square.svg'/>
                    </button>
                    <Tooltip 
                        id="add-list-tooltip"
                        className={styles['add-list-tooltip']}
                        openOnClick={true}
                        place="right"
                        data-tooltip-position-strategy="fixed"
                    >   
                    <p className={styles["add-list-header"]}>Add List:</p>
                        <input type="text" maxLength="20" className={styles["input-addList"]} id="input-addList"/>
                    </Tooltip> 
                </div>
                <SidebarUser username={username}/>
            </div>
        </>
    );
};