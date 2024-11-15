import { Tooltip } from "react-tooltip"
import styles from './Sidebar.module.css'
import { tasksFetch } from '../../../hooks/fetchAPI';
import { useContext } from "react";
import { usernameContext } from '../../../contexts/Contexts'

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddListToolTip(props){
    // const icons = getIcons();
    const {currentUsername} = useContext(usernameContext);

    function handleSubmit(e) {
        //stop redirect 
        e.preventDefault();
        
        let listName = e.target[0].value;
        let filename = 'error';
        console.log(`New list ${listName}Submitted!`)
        postList(listName, filename, currentUsername, () => {
            props.updateUserLists(true);
        })
    }

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



const postList = (newList, filename, username, fnCallBack) => {
    console.log(`Posting list: ${newList}`)
    
    const url = `${BASE_URL}/api/doPostNewList`
    const data = {
        "groupname":newList,
        "filename": filename
    }

    tasksFetch(url,
        {
            "method": "post",
            "body": JSON.stringify(data),
            headers: { username: username }
        }
    )
    .then((res) => {
        if (res.status == 200) {
            fnCallBack()
        } else {
            console.error('Error with adding list!')
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