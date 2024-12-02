import { Tooltip } from "react-tooltip"
import IconList from './IconList'

import styles from './Sidebar.module.css'
import { useContext, useEffect, useState } from "react";
import { listsUpdateContext, usernameContext } from '@Contexts'

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddListToolTip(props){
    // const icons = getIcons();
    const {currentUsername} = useContext(usernameContext);
    const {setListsUpdate} = useContext(listsUpdateContext);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        //stop redirect 
        setError(null);
        e.preventDefault();
        
        let listName = e.target[0].value;
        let filename = document.getElementById("hdf-listicon").value;
        // console.log(`New list ${listName}Submitted!`)

        if(filename == undefined || filename == "") {
            setError("Please choose an icon!")
            return
        }

        const res = await postList(listName, filename, currentUsername)
        if(res.status == 200){
            setListsUpdate(true);
        } else {
            const errortext = await res.text()
            setError(errortext)
        }
    }

    //FIXME: Remove error after unfocused tooltip
    return(
        <Tooltip 
            id="add-list-tooltip"
            className={styles['add-list-tooltip']}
            openOnClick={true}
            place="right"
            data-tooltip-position-strategy="fixed"
            clickable={true}
        >
            <div className={styles["tooltip-wrapper"]}>
                <p className={styles["add-list-header"]}>Add List:</p>
                <form className="form-addList" onSubmit={handleSubmit}>
                    <input type="text" className={styles["input-addList"]} id="input-addList" required/>
                    <IconList />
                    { error ? <label className={styles["frm-addList-error"]}> {error + " :("} </label> : null}
                    <button className={styles["btn-submit-addlist"]}>Submit list</button>
                    <input type="hidden" id="hdf-listicon" name="icon" value="crois.png"/>
                </form>
            </div>
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