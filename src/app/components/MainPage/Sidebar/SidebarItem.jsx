import styles from './Sidebar.module.css'
import { useContext, useEffect, useState } from 'react';
import { usernameContext } from '@/app/contexts/Contexts';

function SidebarItem({ text, icon, className, idName, sidebarType }) {
    const [hideButtons, setHideButtons] = useState(true);
    const {currentUsername} = useContext(usernameContext);
    const groupname = text;
    let displayButtons;

    if(sidebarType === 'default'){
        displayButtons = false;
    } else {
        displayButtons = true;
    }

    const handleEdit = () => { // edit button clicked
        //change text into text input
        let originalName = groupname;
        
        // let params = {
        //     username: currentUsername,
        //     oldName: groupname
        // }
    };

    const handleDelete = () => {
        
    };

    return <div id={idName} className={styles['sidebar-item']}
                onMouseEnter={() => {
                    setHideButtons(false);
                }}
                onMouseLeave={() => {
                    setHideButtons(true);
                }}>
        <embed
            className={`${className} ${styles['sidebar-item-icon']}`}
            src={`/assets/userIcons/${icon}`}
        />
        <a className={styles[className, 'sidebar-item-text']}>{text}</a>

        {displayButtons ? <>
                <button className={styles["btn-sidebarItem"]} id={styles["btn-edit"]} onClick={handleEdit} hidden={hideButtons}>
                    <embed src="/assets/edit.svg" className={styles['sidebar-icon']} id={styles["icon-edit"]}/>
                </button>
                <button className={styles["btn-sidebarItem"]} id={styles["btn-delete"]} onClick={handleDelete} hidden={hideButtons}>
                    <embed src="/assets/delete.svg" className={styles['sidebar-icon']} id={styles["icon-delete"]}/>
                </button>
            </> : null
        }
    </div>
}

export default SidebarItem;