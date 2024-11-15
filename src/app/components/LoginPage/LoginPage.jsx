//TODO: Develop login page maybe with auth
import styles from './LoginPage.module.css';

import { useContext, useEffect } from "react";
import { loginContext,usernameContext } from "../../contexts/Contexts";

function LoginPage() {
    const {setLogin} = useContext(loginContext)
    const {currentUsername, setCurrentUsername} = useContext(usernameContext)

    const handleClick = () => {
        const loginUser = document.getElementById('tf-username').value
        console.log("Confirming login for",loginUser)
        setCurrentUsername(loginUser)
        window.sessionStorage.setItem('username', currentUsername)
        setLogin(true);
    }

    return (
        <div className="Page">
            <button onClick={handleClick} className={styles.button} value="login!"/>
            <input type="text" id="tf-username"></input>
        </div>
    )   
}

export default LoginPage