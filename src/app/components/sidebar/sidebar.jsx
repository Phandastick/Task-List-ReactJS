import ModalAddList from './modalAddList';
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


    return (
        <>
            <div className={`${styles.sidebar} containers`}>
                <h1>To-do List</h1>
                <SidebarPresets />
                <div className={styles["sidebar-divider"]}>
                    <hr className={styles["sidebar-divider-line"]} />
                    <button className={styles["sidebar-addBtn"]}
                        onClick={() => openModal()}
                    >
                        <embed id={styles["addBtn"]} 
                        src='./assets/add_square.svg'/>
                    </button>
                </div>
                <SidebarUser username={username}/>
            </div>
            <ModalAddList 
                isModalOpen={isModalOpen}
                onRequestClose={closeModal}
            />
        </>
    );
};