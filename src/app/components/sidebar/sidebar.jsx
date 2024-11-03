import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'


function Sidebar() {
    let username = 'Lucas';

    return (
        <div className={`${styles.sidebar} containers`}>
            <h1>To-do List</h1>
            <SidebarPresets />
            <hr className={styles["sidebar-divider"]}></hr>
            <SidebarUser username = {username}/>
        </div>
    );
};

export default Sidebar;