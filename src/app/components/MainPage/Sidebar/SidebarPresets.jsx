import SidebarRow from './SidebarRow';
import styles from './Sidebar.module.css'
import React, { useState, useEffect } from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function SidebarPresets(){
    const [list, setlist] = useState([]);
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        // const port = 6969
        const url = `${BASE_URL}/api/doGetDefaultLists`
        
        const fetchData = async () => {
            try {
                // console.log("FETCHING DATA")

                const res = await fetch(url);
                if(res.status != 200){
                    setError(res.statusText)
                    throw new Error(res.statusText)
                }

                const data = await res.json();
                const listnames = data.lists
                console.log(listnames)
                setlist(listnames)
            } catch(err){
                console.error(err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }
 
    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className={styles["sidebar-presets"]}>
            {
                list.map((item, index) => {
                    const className = `sidebar-preset-${index + 1}`;
                    return <SidebarRow
                        text={item.groupname}
                        icon={item.filename}
                        className={styles['sidebar-preset']}
                        idName={className}
                        key={"Preset-" + index}
                    />
                })
            }
        </div>
    )
}