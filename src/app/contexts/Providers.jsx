import { useState } from 'react'
import { usernameContext, 
        loginContext, 
        listsUpdateContext, 
        listsContext, 
        tasksUpdateContext, 
        tasksContext,
        themeContext
        } from '@Contexts';

export default function Providers({children}) {
    const [currentUsername, setCurrentUsername] = useState('default')
    const [isLogin, setLogin] = useState(false);
    const [useListsUpdate, setListsUpdate] = useState(false);
    const [useLists, setLists] = useState([]);
    const [useTasksUpdate, setTasksUpdate] = useState(false);
    const [useTasks, setTasks] = useState([]);
    const [useTheme, setTheme] = useState('Dark');


    return(
        <usernameContext.Provider value={{currentUsername,setCurrentUsername}}>
        <loginContext.Provider value={{isLogin,setLogin}}>
        <listsUpdateContext.Provider value={{useListsUpdate, setListsUpdate}}>
        <listsContext.Provider value={{useLists, setLists}}>
        <tasksUpdateContext.Provider value={{useTasksUpdate, setTasksUpdate}}>
        <tasksContext.Provider value={{useTasks, setTasks}}>
        <themeContext.Provider value={{useTheme, setTheme}}>
            {children}
        </themeContext.Provider>
        </tasksContext.Provider>
        </tasksUpdateContext.Provider>
        </listsContext.Provider>
        </listsUpdateContext.Provider>
        </loginContext.Provider>
        </usernameContext.Provider>
    )
}

