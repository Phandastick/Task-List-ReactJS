
import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'
import AddListToolTip from './AddListTooltip';

export default function Sidebar() {
    // console.log(username);
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
                <AddListToolTip/>
            </div>
            <SidebarUser />
        </div>
    );
};