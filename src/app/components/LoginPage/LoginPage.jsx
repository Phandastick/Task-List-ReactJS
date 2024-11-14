//TODO: Develop login page maybe with auth
import styles from './LoginPage.module.css';

import { useContext } from "react";
import { loginContext } from "../../contexts/Contexts";

function LoginPage() {
    const {setLogin} = useContext(loginContext)

    const handleClick = () => {
        console.log("Confirming login...")
        setLogin(true);
    }

    return (
        <div className="Page">
            <button onClick={handleClick} className={styles.button}/>
        </div>
    )   
}

export default LoginPage