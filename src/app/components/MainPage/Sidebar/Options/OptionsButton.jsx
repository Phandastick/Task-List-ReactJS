import { useContext, useState } from "react";
import styles from './OptionsButton.module.css'
import { usernameContext, themeContext } from "@Contexts";
import { loginContext } from "@/app/contexts/Contexts";

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function OptionsButton() {
    const [showList, setShowList] = useState(false)
    
    const handleShowList = () => {
        if(showList){
            setShowList(false);
        } else {
            setShowList(true);
        }
    }
    return(<div className={styles["options-wrapper"]}>
            <button className={styles["btn-options-caret"]} onClick={handleShowList}>
                <embed src="/assets/caret_down.svg" id={styles["embed-caretdown"]}/>
            </button>
            {
                showList ? <Menu />: null
            }
        </div>
    )
}

function Menu() {
    const {useTheme,setTheme} = useContext(themeContext);
    const {setLogin} = useContext(loginContext);
    const {setCurrentUsername} = useContext(usernameContext)
    const switchTheme = () => {
        if(useTheme == 'Dark'){
            setTheme('Light')
        } else {
            setTheme('Dark')
        }
    }

    const handleLogout = () => {
        setCurrentUsername(null);
        setLogin(false);
    }
    const handleShowSettings = () => {
        window.alert("Not implemented :(")
    }
    return ( //TODO: add profile settings, theme
        <div className={styles["options-container"]}>
            <button className={styles["btn-options"]} onClick={handleShowSettings}>
                Profile 
            </button>
            <button className={styles["btn-options"]} onClick={switchTheme}>
                { useTheme }
            </button>
            <button className={styles["btn-options"]} onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}