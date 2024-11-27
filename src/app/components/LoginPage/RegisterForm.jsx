import { useState } from 'react';
import styles from './LoginPage.module.css'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default function RegisterForm({setRegister}) {
    const [message, setMessage] = useState(null);
    const [stateDisabled, setStateDisabled] = useState(false);

    const disableBtn = () => {
        setStateDisabled(true);
    }
    const enableBtn = () => {
        setStateDisabled(false);
    }

    const goToLogin = () => {
        setRegister(false);
    }

    function reConfirmPassword(){
        document.getElementById('input-confirm-password').value = ""
        document.getElementById('input-password').value = ""
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
        console.log("Handling submit user")
        setMessage(null)
        disableBtn();
        e.preventDefault();
        const data = new FormData(e.target)
        const username = data.get("username")
        const password = data.get("password")
        const confirm = data.get("confirm-password")
        
        try {
            if(password !== confirm)
                return reConfirmPassword();

            //do login
            console.log("Confirming login for",username)
            const result = await registerFetch(username, password);
            
            if(result.status == 200){
                setMessage("User successfully added!");
                //TODO: Redirect user to login after a timeout
                setTimeout(() => {
                    goToLogin();
                },1000)
            }else {
                throw new Error(await result.text())
            }
        } catch (err) {
            setMessage(err.message)
        } finally {
            console.log("enabling button")
            enableBtn();
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
                <input className={styles['tf-form']} id="input-password"name="password" type="password" required></input>

                <label className={styles['lbl-form']} name="confirm-password">Confirm Password</label>
                <input className={styles['tf-form']} id="input-confirm-password" name="confirm-password" type="password" required></input>

                {message ? <a className={styles['txt-register-message']}>{message}</a> : null}

                <button className={styles['btn-form']} disabled={stateDisabled}></button>
            </form>
        </div>
    )
}