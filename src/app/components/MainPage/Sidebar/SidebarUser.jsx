import SidebarRow from './SidebarRow';
import React, { useState, useEffect, useContext } from 'react';
import styles from './Sidebar.module.css'
import { usernameContext } from '../../../contexts/Contexts';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export default function SidebarUser(props){
    const [list, setlist] = useState(null)
    const {currentUsername} = useContext(usernameContext)
    const updateFlag = props.updateFlag;
    const setUpdateFlag = props.setUpdateFlag;
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    // setUsername("lucas")

    const url = `${BASE_URL}/api/doGetLists?username=${currentUsername}`
    useEffect(() => {
        console.log('Fetchin GET url', url) 
        const fetchData = async () => {
            try{
                const res = await fetch(url)
                if(res.status != 200){
                    throw new Error(res.statusText)
                }
                const data = await res.json()
                const lists = data.body
                setlist(lists)
            } catch(err){
                console.error(err)
                setError(err.message)
            } finally {
                if(updateFlag)
                    setUpdateFlag(false)
                setLoading(false)
            }
        }
        fetchData();
    }, [updateFlag])

    if (error) {
        return <div> {error}</div>
    }

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

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
                        key={index}
                    />
                })
            }
        </div> 
    )
}

