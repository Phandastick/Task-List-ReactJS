import { useState } from 'react'
import { usernameContext, 
        loginContext, 
        listsUpdateContext, 
        listsContext, 
        tasksUpdateContext, 
        tasksContext,
        themeContext,
        modalModeContext,
        filterListContext
        } from '@Contexts';

export default function Providers({children}) {
    const [currentUsername, setCurrentUsername] = useState('default')
    const [isLogin, setLogin] = useState(false);
    const [useListsUpdate, setListsUpdate] = useState(false); //Update flag for updating lists
    const [useLists, setLists] = useState([]); //Lists content
    const [useTasksUpdate, setTasksUpdate] = useState(false); //Update flag for tasks UI
    const [useTasks, setTasks] = useState([]); //Tasks content
    const [useTheme, setTheme] = useState('Dark');
    const [useModalMode, setModalMode] = useState(null);
    const [useFilterList, setFilterList] = useState([]);

    return(
        <usernameContext.Provider value={{currentUsername,setCurrentUsername}}>
        <loginContext.Provider value={{isLogin,setLogin}}>
        <listsUpdateContext.Provider value={{useListsUpdate, setListsUpdate}}>
        <listsContext.Provider value={{useLists, setLists}}>
        <tasksUpdateContext.Provider value={{useTasksUpdate, setTasksUpdate}}>
        <tasksContext.Provider value={{useTasks, setTasks}}>
        <themeContext.Provider value={{useTheme, setTheme}}>
        <modalModeContext.Provider value={{useModalMode, setModalMode}}>
        <filterListContext.Provider value={{useFilterList, setFilterList}}>
            {children}
        </filterListContext.Provider>
        </modalModeContext.Provider>
        </themeContext.Provider>
        </tasksContext.Provider>
        </tasksUpdateContext.Provider>
        </listsContext.Provider>
        </listsUpdateContext.Provider>
        </loginContext.Provider>
        </usernameContext.Provider>
    )
}

