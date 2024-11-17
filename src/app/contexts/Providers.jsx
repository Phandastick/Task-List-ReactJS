import { useState } from 'react'
import { usernameContext, loginContext } from './Contexts';

export default function Providers({children}) {
    const [currentUsername, setCurrentUsername] = useState(null)
    const [isLogin, setLogin] = useState(false);

    return(
        <usernameContext.Provider value={{currentUsername,setCurrentUsername}}>
            <loginContext.Provider value={{isLogin,setLogin}}>
                {children}
            </loginContext.Provider>
        </usernameContext.Provider>
    )
}

