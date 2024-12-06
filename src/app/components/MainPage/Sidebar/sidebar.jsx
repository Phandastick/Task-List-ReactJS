
import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'
import AddListToolTip from './AddListTooltip';
import OptionsButton from './Options/OptionsButton'

export default function Sidebar() {
    // console.log(username);
    function focusField(){
        let tf = document.getElementById('input-addList');
        tf.focus();
    }

    return (
        <div className={styles['containers', 'sidebar']}>
            <div className={styles['sidebar-header-div']}>
                <h1>To-do List</h1> <OptionsButton/>
            </div>
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