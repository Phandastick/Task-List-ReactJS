import SidebarRow from './SidebarRow';
import styles from './Sidebar.module.css'
import React, { useState, useEffect } from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function SidebarPresets(){
    const [list, setlist] = useState([])
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        // const port = 6969
        const url = `${BASE_URL}/api/doGetLists`
        
        // console.log('Fetchin GET url', url) 
        const fetchData = async () => {
            try {
                fetch(url)
                .then((res) => {
                    return res.json()
                })
                .then((data) =>{
                    setLoading(false)
                    const lists = data.body
                    setlist(lists)
                })
            } catch(err){
                console.error(err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    if (error) {
        setlist([{"name":"Error Fetching Lists","file":"error"}])
        return
    }

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
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