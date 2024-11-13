import { createContext, useCallback, useContext, useState } from "react";

export const usernameContext = createContext('error')
export const loginContext = createContext(false);

export function Providers({children}) {
    const [currentUsername, setCurrentUsername] = useState('error')
    const [isLogin, setLogin] = useState(false);

    return(
        <usernameContext.Provider value={{currentUsername,setCurrentUsername}}>
            <loginContext.Provider value={{isLogin, setLogin}}>
                {children}
            </loginContext.Provider>
        </usernameContext.Provider>
    )
}

