import SidebarRow from './SidebarRow';
import styles from './Sidebar.module.css'
import React, { useState, useEffect } from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function SidebarPresets(){
    const [list, setlist] = useState([])

    try {
        // const port = 6969
        const url = `${BASE_URL}/api/doGetLists`
        
        useEffect(() => {
            console.log('Fetchin GET url', url) 
            fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // console.log('Data Received!: ')
                // console.log(data)
                setlist(data.data)  
            })
            .catch((error) => {
                console.error('Fetch error in sidebarPresets:',error)
                setlist([{"name":"Error Fetching Lists","file":"error"}])
            });
        }, [])
    } catch (err){
        console.error('SOMETHING WENT WRONG: ',err.stack)
    }

    return (
        <div className={styles["sidebar-presets"]}>
            {
                list.map((item, index) => {
                    const className = `sidebar-preset-${index + 1}`;
                    return <SidebarRow
                        text={item.name}
                        icon={item.file}
                        className={className}
                        idName={className}
                        key={index + 1}
                    />
                })
            }
        </div>
    )
}