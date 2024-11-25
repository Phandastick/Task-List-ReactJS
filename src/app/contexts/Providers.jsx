import { useEffect, useState } from 'react'
import { usernameContext, 
        loginContext, 
        listsUpdateContext, 
        listsContext, 
        tasksUpdateContext, 
        tasksContext 
        } from './Contexts';

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function Providers({children}) {
    const [currentUsername, setCurrentUsername] = useState('default')
    const [isLogin, setLogin] = useState(false);
    const [useListsUpdate, setListsUpdate] = useState(false);
    const [useLists, setLists] = useState([]);
    const [useTasksUpdate, setTasksUpdate] = useState(false);
    const [useTasks, setTasks] = useState([]);

    useEffect(()=>{ //fetch new lists for dropdown when new lists are added
        const fetchTasks = async () => {
            try{
                const url = `${BASE_URL}/api/doGetLists?username=${currentUsername}`

                const res = await fetch(url);
                const data = await res.json();

                const lists = data.lists;
                setLists(lists);
            }finally {
                if(useTasksUpdate)
                    setListsUpdate(false);
            }

        }
    },[useListsUpdate])


    return(
        <usernameContext.Provider value={{currentUsername,setCurrentUsername}}>
        <loginContext.Provider value={{isLogin,setLogin}}>
        <listsUpdateContext.Provider value={{useListsUpdate, setListsUpdate}}>
        <listsContext.Provider value={{useLists, setLists}}>
        <tasksUpdateContext.Provider value={{useTasksUpdate, setTasksUpdate}}>
        <tasksContext.Provider value={{useTasks, setTasks}}>
            {children}
        </tasksContext.Provider>
        </tasksUpdateContext.Provider>
        </listsContext.Provider>
        </listsUpdateContext.Provider>
        </loginContext.Provider>
        </usernameContext.Provider>
    )
}

