
import { Tooltip } from 'react-tooltip';
import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'

import { useCallback, useEffect, useState } from 'react';
import { tasksFetch } from '../../hooks/fetchAPI';
const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Sidebar() {
    // console.log(username);

    const [userListsFlag, updateUserLists] = useState(false);
    const [newList, setNewList] = useState('');

    function handleSubmit(e) {
        //stop redirect 
        e.preventDefault();
        
        let listName = e.target[0].value;
        console.log(`New list ${listName}Submitted!`)
        // setNewList(listName);
        handlePost(listName);
    }

    function focusField(){
        let tf = document.getElementById('input-addList');
        tf.focus()
    }    

    const handlePost = async (newList) => {
        console.log(`Posting list: ${newList}`)
        
        const url = `${BASE_URL}/api/doPostNewList`
        const data = {
            "groupname":newList
        }

        tasksFetch(url,
            {
                "method": "post",
                "body": JSON.stringify(data)
            }
        )
        .then((res) => {
            if (res.status == 200) {
                updateUserLists(true);
            }
            return res.json()
        })
        .then((data) => {
            console.log('Received response!!')
            console.log(data);
        }).catch((err) => {
            console.error('Error with post request!', err)
        })
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
                    <embed id={styles["addBtn"]} 
                    src='./assets/add_square.svg'/>
                </button>
                <Tooltip 
                    id="add-list-tooltip"
                    className={styles['add-list-tooltip']}
                    openOnClick={true}
                    place="right"
                    data-tooltip-position-strategy="fixed"
                    clickable={true}
                >
                    <p className={styles["add-list-header"]}>Add List:</p>
                    <form className="form-addList" onSubmit={handleSubmit}>
                        <input type="text" maxLength="20" className={styles["input-addList"]} id="input-addList"/>
                    </form>
                </Tooltip>
            </div>
            <SidebarUser 
                updateFlag={userListsFlag}
            />
        </div>
    );
};