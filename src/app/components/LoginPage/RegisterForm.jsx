import { useState } from 'react';
import styles from './LoginPage.module.css'



export default function RegisterForm({setRegister}) {
    const [error, setError] = useState(null);

    const goToLogin = () => {
        setRegister(false);
    }

    function reConfirmPassword(){
        setError("Your passwords does not match!")
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

    return (
        <div className={styles["register-container"]}>
            <h1 className={styles["login-head"]}>Register</h1>
            <a onClick={goToLogin} className={styles["text-backtologin"]}>&lt; Back to login</a>

            <form className={styles.form}>
                <label className={styles['lbl-form']} name="username">Username</label>
                <input className={styles['tf-form']} type="text"></input>

                <label className={styles['lbl-form']} name="password">Password</label>
                <input className={styles['tf-form']} type="text"></input>

                <label className={styles['lbl-form']} name="confirm-password">Confirm Password</label>
                <input className={styles['tf-form']} type="text"></input>

                {error ? <a className='txt-register-error'>{error}</a> : null}

                <button className={styles['btn-form']} onClick={handleSubmitUser}></button>
            </form>
        </div>
    )
}