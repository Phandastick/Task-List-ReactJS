import SidebarRow from './SidebarRow';
import React, { useState, useEffect, useContext } from 'react';
import styles from './Sidebar.module.css'
import { usernameContext } from '../../contexts';


export default function SidebarUser(props){
    const [list, setlist] = useState([])
    const username = useContext(usernameContext);
    const setUpdateFlag = props.updateUserLists;

    const url = `/api/doGetLists?username=${username}`
        
    useEffect(() => {   
        setUpdateFlag(false);
        console.log('Fetchin url', url) 
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log('Data Received!: ')
            console.log(data)
            setlist(data.data)
        })
        .catch((error) => {
            console.error('Fetch error:',error)
            setlist([{"name":`Error Fetching Icons for ${username}`,"file":"error"}])
        });
    }, [props.updateFlag, username])

    return (
        <div className={styles["sidebar-custom"]}>
            {
                list.map((item, index) => {
                    const className = `sidebar-preset-${index + 1}`;
                    return <SidebarRow
                        text={item.name}
                        icon={item.file}
                        className={className}
                        idName={className}
                        key={item.name}
                    />
                })
            }
        </div>
    )
}

