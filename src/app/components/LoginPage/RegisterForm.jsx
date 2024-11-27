import { useState } from 'react';
import styles from './LoginPage.module.css'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function RegisterForm({setRegister}) {
    const [message, setMessage] = useState(null);

    const goToLogin = () => {
        setRegister(false);
    }

    function reConfirmPassword(){
        setMessage("Your passwords does not match!")
    }

    async function registerFetch(username, password) {
        const url = `${BASE_URL}/api/login/doPostNewUser`
        const headers = {
            'Content-type': 'application/json'
        }
        const payload = {
            username: username,
            password: password
        }

        const res = await fetch(url,{
                headers: headers,
                body: JSON.stringify(payload),
                method: 'post'
            }
        )

        return res
    }

    const handleSubmitUser = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const username = data.get("username")
        const password = data.get("password")
        const confirm = data.get("confirm-password")

        if(password !== confirm)
            return reConfirmPassword();

        //do login
        console.log("Confirming login for",username)
        try {
            const result = await registerFetch(username, password);
            
            if(result.status == 200){
                setMessage("User successfully added!")
            }else {
                throw new Error(result.statusText)
            }
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <div className={styles["register-container"]}>
            <h1 className={styles["login-head"]}>Register</h1>
            <a onClick={goToLogin} className={styles["text-backtologin"]}>&lt; Back to login</a>

            <form className={styles.form} onSubmit={handleSubmitUser}>
                <label className={styles['lbl-form']} name="username">Username</label>
                <input className={styles['tf-form']} name="username" type="text" required></input>

                <label className={styles['lbl-form']} name="password">Password</label>
                <input className={styles['tf-form']} name="password" type="password" required></input>

                <label className={styles['lbl-form']} name="confirm-password">Confirm Password</label>
                <input className={styles['tf-form']} name="confirm-password" type="password" required></input>

                {message ? <a className={styles['txt-register-message']}>{message}</a> : null}

                <button className={styles['btn-form']}></button>
            </form>
        </div>
    )
}