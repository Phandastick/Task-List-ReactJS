import ModalAddList from './modalAddList';
import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'
import { useState } from 'react';

const handleNewList =  function(setModal) {
    console.log('Clicked new list!')
    setModal(true);
}


function Sidebar() {
    const [isModalOpen, setModal] = useState(false);
    const [username, setuser] = useState('lucas')
    // console.log(username);

    return (
        <>
            <div className={`${styles.sidebar} containers`}>
                <h1>To-do List</h1>
                <SidebarPresets />
                <div className={styles["sidebar-divider"]}>
                    <hr className={styles["sidebar-divider-line"]} />
                    <div className={styles["sidebar-addBtn"]}
                        onClick= {() => handleNewList(setModal)}>
                        <embed id={styles["addBtn"]} 
                        src='./assets/add_square.svg'/>
                    </div>
                </div>
                <SidebarUser username={username}/>
            </div>
            <ModalAddList 
                isModalOpen={isModalOpen}
            />
        </>
    );
};

export default Sidebar;