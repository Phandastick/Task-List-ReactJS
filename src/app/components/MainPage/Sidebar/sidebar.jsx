
import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'

import { useState } from 'react';
import AddListToolTip from './AddListTooltip';
const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Sidebar() {
    // console.log(username);
    const [userListsFlag, updateUserLists] = useState(false);

    function focusField(){
        let tf = document.getElementById('input-addList');
        tf.focus()
    }

    return (
        <div className={`${styles.sidebar} containers`}>
            <h1>To-do List</h1>
            <SidebarPresets />
            <div className={styles["sidebar-divider"]}>
                <hr className={styles["sidebar-divider-line"]} />
                <button className={styles["sidebar-addBtn"]}
                    data-tooltip-id='add-list-tooltip'
                    onClick={focusField}
                >
                    <embed id={styles["embed-addBtn"]} 
                    src='./assets/add_square.svg'/>
                </button>
                <AddListToolTip 
                    updateUserLists={updateUserLists}
                />
            </div>
            <SidebarUser 
                updateFlag={userListsFlag}
            />
        </div>
    );
};