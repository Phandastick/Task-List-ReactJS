import SidebarRow from './SidebarRow';
import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css'


export default function SidebarUser({_username}){
    const [list, setlist] = useState([])
    const [username, setusername] = useState(_username)

    const url = `/doGetLists?username=${username}`
        
    useEffect(() => {
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
    }, [username])

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