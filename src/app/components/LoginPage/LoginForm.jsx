
import styles from './LoginPage.module.css'

import { useContext, useEffect, useState } from "react";
import { loginContext,usernameContext } from "../../contexts/Contexts";

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function LoginForm({setRegister}) {
    const [error, setError] = useState(null)

    const {setLogin} = useContext(loginContext)
    const {currentUsername, setCurrentUsername} = useContext(usernameContext)

    const handleLogin = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const username = data.get("username")
        const password = data.get("password")

        //do login
        console.log("Confirming login for",username)
        try {
        const result = await fetchLogin(username, password);
        
        if(result){
            window.sessionStorage.setItem('username', currentUsername)
            setCurrentUsername(username)
            setLogin(true)
        } else {
            throw new Error()
        }
        } catch (err) {
            setError("Username or password incorrect!")
        }
    }

    const handleRegister = () => {
        setRegister(true);
    }

    return <div className={styles['login-container']}>
        <h1 className={styles["login-head"]}>To-do List</h1>
        <form className={styles["form"]} onSubmit={handleLogin}>
            <label className={styles["lbl-form"]} id={styles["lbl-Username"]}> Username </label>
            <input type="text" name="username" id={styles["tf-username"]} className={styles["tf-form"]} required />

            <label  className={styles["lbl-form"]} id={styles["lbl-Password"]}> Password </label>
            <input type="password" name="password" id={styles["tf-password"]} className={styles["tf-form"]} required/>

            {error ? <div>{error}</div> : null}

            <button className={styles['btn-form']}>
                <embed 
                className={styles["loginIcon-embed"]}
                id={styles["icon-Login"]}
                src={`${BASE_URL}/assets/arrow_right.svg`} />
            </button>
            <a 
            className={styles['link-register']}
            onClick={handleRegister}>
                Register here</a>
            <a className={styles['forgotPassword']}>Forgot password?</a>
        </form>
    </div>
}

async function fetchLogin(username, password){
    const payload = {
        username: username,
        password: password
    }

    const url = `${BASE_URL}/api/login/doSignIn`;
    
    const res = await fetch(url, {
        body: JSON.stringify(payload),
        method: "post",
        headers: {
            "Content-type": "application/json"
        }
    })

    if (res.status == 200) {
        return {
            success: true
        }
    } else {
        const data = await res.json()
        return {
            success: false,
            message: data.statusText
        }
    }
}