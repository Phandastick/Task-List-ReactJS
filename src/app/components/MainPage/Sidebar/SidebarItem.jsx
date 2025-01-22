import styles from './Sidebar.module.css'
import { useContext, useEffect, useState } from 'react';
import { listsUpdateContext, usernameContext } from '@Contexts';
import { Tooltip } from 'react-tooltip';

const BASE_URL = import.meta.env.VITE_BASE_URL

function SidebarItem({ text, icon, className, idName, sidebarType }) {
    const [hideButtons, setHideButtons] = useState(true);
    const [useEditMode, setEditMode] = useState(null);
    const [useDeleteConfirm, setDeleteConfirm] = useState(false);
    const {currentUsername} = useContext(usernameContext);
    const {setListsUpdate} = useContext(listsUpdateContext);
    let displayButtons;

    if(sidebarType === 'default'){
        displayButtons = false;
    } else {
        displayButtons = true;
    }

    const handleEdit = (e) => { // edit button clicked
        //gets the div that displays list name
        if(useEditMode == "edit"){ // toggles edit mode
            setEditMode("normal");
        } else {
            setEditMode("edit");
        }
    };

    const handleDelete = () => {
        setDeleteConfirm(true); //show red bg button
    };

    const handleDeleteConfirm = async (e) => {
        const groupname = text;

        const url = `${BASE_URL}/api/doDeleteList`
        const payload = {
            username: currentUsername,
            groupname: groupname
        }
        const headers = {
            'Content-type': 'application/json'
        }

        try {
            const res = await fetch(url, {
                body: JSON.stringify(payload),
                headers: headers,
                method: "DELETE"
            })

            if(res.status === 204 || res.status === 200){
                return
            }

            throw Error(res.statusText)
        } catch (error) {
            debugger
            console.error(error)
        } finally {
            setListsUpdate(true);
        }
    }
    
    const handleEditList = async (e) => {
        e.preventDefault();
        let tf = document.getElementById('sidebar-tf');
        let newGroupname = tf.value;

        const url = `${BASE_URL}/api/doPatchList`
        const payload = {
            username: currentUsername,
            oldGroupname: text,
            newGroupname: newGroupname
        }
        const headers = {
            'Content-type': 'application/json'
        }

        try {
            const res = await fetch(url, {
                body: JSON.stringify(payload),
                method: "PATCH",
                headers: headers
            })

            if (res.status != 200){
                throw new Error(res.statusText)
            }
            
        } catch (error) {
            console.error(error)
        } finally {//re render list
            setListsUpdate(true);
        }
    }

    return <div id={idName} className={styles['sidebar-item']}
                onMouseEnter={() => {
                    setHideButtons(false);
                }}
                onMouseLeave={() => {
                    setHideButtons(true);
                    setDeleteConfirm(false);
                }}>

        <embed
            className={`${className} ${styles['sidebar-item-icon']}`}
            src={`/assets/userIcons/${icon}`}
        />
        {
            (useEditMode == "edit") ? <form onSubmit={handleEditList}>
                    <input 
                    name="newGroupname" 
                    type="text" 
                    defaultValue={text} 
                    id="sidebar-tf" 
                    autoFocus={true} 
                    onBlur={() => {setEditMode("normal")}}/>
                </form> :
            <a className={styles[className, 'sidebar-item-text']}>{text}</a>
        }

        { displayButtons ? <>
                <button className={`${styles["btn-sidebarItem"]} ${styles["btn-edit"]}`} onClick={handleEdit} hidden={hideButtons}>
                    <embed src="/assets/edit.svg" className={styles['sidebar-icon']} id={styles["icon-edit"]}/>
                </button>
            {
                useDeleteConfirm ? <>
                <button className={`${styles["btn-sidebarItem"]} ${styles["btn-delete-confirm"]}`} onClick={handleDeleteConfirm} hidden={hideButtons}
                        data-tooltip-id="warning-tooltip"
                        data-tooltip-content="Warning: deletes ALL tasks too!"
                        data-tooltip-place="top"
                        data-tooltip-variant="warning"
                >
                    <embed src="/assets/delete.svg" className={styles['sidebar-icon']} id={styles["icon-delete"]}/>
                </button>
                <Tooltip id="warning-tooltip" defaultIsOpen={true}/> </>:
                <button className={`${styles["btn-sidebarItem"]} ${styles["btn-delete"]}`} onClick={handleDelete} hidden={hideButtons}>
                    <embed src="/assets/delete.svg" className={styles['sidebar-icon']} id={styles["icon-delete"]}/>
                </button>
            }
            </> : null
        }
    </div>
}

export default SidebarItem;