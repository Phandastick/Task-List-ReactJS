
import styles from './LoginPage.module.css'

import { useContext, useEffect } from "react";
import { loginContext,usernameContext } from "../../contexts/Contexts";

export default function LoginForm() {

    const {setLogin} = useContext(loginContext)
    const {currentUsername, setCurrentUsername} = useContext(usernameContext)

    const handleLogin = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const username = data.get("username")
        const password = data.get("password")

        //do login
        console.log("Confirming login for",username)
        setCurrentUsername(username)
        window.sessionStorage.setItem('username', currentUsername)
        setLogin(true);
    }

    return <div className={styles['login-container']}>
        <h1 className={styles["login-head"]}>To-do List</h1>
        <form className={styles["frm-login"]} onSubmit={handleLogin}>
            <label className={styles["lbl-login"]} id={styles["lbl-Username"]}> Username </label>
            <input type="text" name="username" id={styles["tf-username"]} className={styles["tf-login"]} required />

            <label  className={styles["lbl-login"]} id={styles["lbl-Password"]}> Password </label>
            <input type="password" name="password" id={styles["tf-password"]} className={styles["tf-login"]} required/>

            <button className={styles.button}>PRESS ME!</button>
        </form>
    </div>
}