import SidebarRow from './SidebarRow';
import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css'


export default function SidebarUser({username = 'Bob'}){
    const [list, setlist] = useState([])
    const [currentUsername, setcurrentUsername] = useState(username)

    const url = `/api/doGetLists?username=${currentUsername}`
        
    useEffect(() => {
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
            setlist([{"name":`Error Fetching Icons for ${currentUsername}`,"file":"error"}])
        });
    }, [currentUsername])

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