import { Tooltip } from "react-tooltip"
import styles from './Sidebar.module.css'
import { useContext, useState } from "react";
import { listsUpdateContext, usernameContext } from '@Contexts'

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddListToolTip(props){
    // const icons = getIcons();
    const {currentUsername} = useContext(usernameContext);
    const {setListsUpdate} = useContext(listsUpdateContext);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        //stop redirect 
        e.preventDefault();
        
        let listName = e.target[0].value;
        let filename = 'cross';
        // console.log(`New list ${listName}Submitted!`)

        const res = await postList(listName, filename, currentUsername)
        if(res.status == 200){
            setListsUpdate(true);
        } else {
            setError(res.statusText)
        }
    }

    //TODO: Add UI for icon choosing
    return(
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
                <input type="text" className={styles["input-addList"]} id="input-addList"/>
            </form>
        </Tooltip>
    )
}



const postList = async (newList, filename, username) => {
    console.log(`Posting list: ${newList}`)
    
    const url = `${BASE_URL}/api/doPostNewList`
    const payload = {
        "username": username,
        "groupname":newList,
        "filename": filename,
    }

    const res = await fetch(url,
        {
            "method": "post",
            "body": JSON.stringify(payload),
            headers: {
                'Content-type': 'application/json'
            }
        }
    )
    return res
}   