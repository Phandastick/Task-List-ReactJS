import SidebarRow from './SidebarRow';
import React, { useState, useEffect, useContext } from 'react';
import styles from './Sidebar.module.css'
import { usernameContext } from '../../../contexts/Contexts';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export default function SidebarUser(props){
    const [list, setlist] = useState([])
    const {username, setUsername} = useContext(usernameContext)
    const updateFlag = props.updateFlag;

    // setUsername("lucas")

    const url = `${BASE_URL}/api/doGetLists?username=${username}`
    useEffect(() => {
        console.log('Fetchin GET url', url) 
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // console.log('SidebarUsers.jsx> Data Received!: ')
            // console.log(data)
            if(data.data !== undefined && data.data.length != 0){
                setlist(data.data)
            } else {
                setlist([{"name":`Error Fetching Icons for ${username}`,"file":"error"}])
                console.log("Error processing data in SidebarUser")
            }
        })
        .catch((error) => {
            console.error('Fetch error in sidebarUser:',error)
            setlist([{"name":`Error Fetching Icons for ${username}`,"file":"error"}])
        });
    }, [username,updateFlag])

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

