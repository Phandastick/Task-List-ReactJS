//TODO: Develop login page maybe with auth
import styles from './LoginPage.module.css';
import Loginbg from './Loginbg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'
import { useState } from 'react';

function LoginPage() {
    const [register, setRegister] = useState(false);

    return (
        <div className={styles.Page}>
            <Loginbg />
            {
                register ? <RegisterForm setRegister={setRegister} /> : <LoginForm setRegister={setRegister}/>
            }
        </div>
    )   
}

export default LoginPage