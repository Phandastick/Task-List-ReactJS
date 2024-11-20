
import styles from './LoginPage'

import { useContext, useEffect } from "react";
import { loginContext,usernameContext } from "../../contexts/Contexts";

export default function LoginForm() {

    const {setLogin} = useContext(loginContext)
    const {currentUsername, setCurrentUsername} = useContext(usernameContext)

    const handleClick = () => {
        const loginUser = document.getElementById('tf-username').value
        console.log("Confirming login for",loginUser)
        setCurrentUsername(loginUser)
        window.sessionStorage.setItem('username', currentUsername)
        setLogin(true);
    }

    return <div className={styles['login-container']}>
        <form className={styles["frm-login"]}>
            <input type="text" id="tf-username"></input>
            <button onClick={handleClick} className={styles.button} value="login!"/>
        </form>
    </div>
}