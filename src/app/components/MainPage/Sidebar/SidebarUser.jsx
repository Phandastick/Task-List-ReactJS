import SidebarRow from './SidebarRow';
import React, { useState, useEffect, useContext } from 'react';
import styles from './Sidebar.module.css'
import { listsContext, listsUpdateContext, usernameContext } from '@Contexts';
const BASE_URL = import.meta.env.VITE_BASE_URL;


//TODO: Implement edit and delete operations
export default function SidebarUser(props){
    const [sidebarLists, setSidebarLists] = useState(null)
    const {currentUsername} = useContext(usernameContext)

    const {useListsUpdate, setListsUpdate} = useContext(listsUpdateContext)
    const {useLists, setLists} = useContext(listsContext)
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    // setUsername("lucas")

    useEffect(() => {
        setError(null)
        setLoading(true)
        // console.log('Fetchin GET url', url) 
        const fetchData = async () => {
            try{
                const url = `${BASE_URL}/api/doGetLists?username=${currentUsername}`
                const res = await fetch(url)
                if(res.status != 200){
                    throw new Error(res.statusText)
                }
                const data = await res.json()
                const lists = data.lists

                if(lists != undefined || lists.length > 0){
                    setLists(lists)
                } else if(lists == undefined || lists.length < 1){
                    setError("No lists found for this user, please add new lists before adding tasks :D")
                }
            } catch(err){
                console.error(err)
                setError(err.message)
            } finally {
                setListsUpdate(false);
                setLoading(false)
            }
        }
        fetchData();
    }, [useListsUpdate])

    useEffect(()=>{
        setSidebarLists(useLists)
    }, [useLists])

    if (error) {
        return <div> {error}</div>
    }

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator
    }

    return (
        <div className={styles["sidebar-user"]}>
            {
                sidebarLists.map((item, index) => {
                    const className = `sidebar-user-${index + 1}`;
                    return <SidebarRow
                        text={item.groupname}
                        icon={item.filename}
                        className={styles['sidebar-user']}
                        idName={className}
                        key={"Userlist-"+   index}
                    />
                })
            }
        </div> 
    )
}

