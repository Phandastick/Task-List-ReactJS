import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'
import { useState } from 'react';


function Sidebar() {
    const [username, setuser] = useState('lucas')
    // console.log(username);

    return (
        <div className={`${styles.sidebar} containers`}>
            <h1>To-do List</h1>
            <SidebarPresets />
            <hr className={styles["sidebar-divider"]}></hr>
            <SidebarUser username={username}/>
        </div>
    );
};

export default Sidebar;