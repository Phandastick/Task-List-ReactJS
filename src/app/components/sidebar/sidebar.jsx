
import { Tooltip } from 'react-tooltip';
import styles from './Sidebar.module.css'
import SidebarPresets from './SidebarPresets'
import SidebarUser from './SidebarUser'
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const [username, setuser] = useState('lucas')
    const [isUpdateList, setUpdate] = useState(false)
    // console.log(username);

    function handleSubmit(e) {
        //stop redirect 
        e.preventDefault();
        
        let list = e.target[0].value;
        console.log(`New List ${list}Submitted!`)
        postList(list);
        updateUserLists(true); //TODO add a new list
    }

    function focusField(){
        let tf = document.getElementById('input-addList');
        tf.focus()
    }

    const updateUserLists = bool => {
        setUpdate(bool)
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
                username={username} 
                updateUserLists={updateUserLists} 
                updateFlag={isUpdateList}/>
        </div>
    );
};

function postList(listname) {
    const url = '/api/doPostNewList'
    const headers = {
        'content-type': 'application/json'
    }
    const data = {
        "groupname":listname
    }

    console.log(`Posting list: ${listname}...`)

    fetch(url,
        {
            "method": "post",
            "headers": headers,
            "body": data
        }
    )
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        console.log('Received response!!')
        console.log(data);
    }).catch((err) => {
        console.error('Error with post request!', err)
    })
}