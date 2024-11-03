import SidebarRow from './SidebarRow';
import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css'


export default function SidebarPresets(){
    const [list, setlist] = useState([])

    try {
        // const port = 6969
        const url = `/api/doGetLists`
        
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