//TODO: Develop login page maybe with auth
import styles from './LoginPage.module.css';
import Loginbg from './Loginbg';
import LoginForm from './LoginForm';

function LoginPage() {

    return (
        <div className={styles.Page}>
            <Loginbg />
            <LoginForm />
        </div>
    )   
}

export default LoginPage