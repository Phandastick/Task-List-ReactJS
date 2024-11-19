//TODO: Develop login page maybe with auth
import styles from './LoginPage.module.css';

import { useContext, useEffect } from "react";
import { loginContext,usernameContext } from "../../contexts/Contexts";
const BASE_URL = import.meta.env.VITE_BASE_URL;

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

    const getBgImage = async () => {
        try{
            const url = `${BASE_URL}/api/login/doGetLoginImage`
            const res = await fetch(url)
            const data = await res.json()

            const urls = data.urls;
            const imgUrl = `${urls.raw}&w=1500&dpr=2`;

            const photoName = data.author;
            const attributionLink = data.links[0];
    
            return (
                <>
                    <div className={styles["bg-image"]} href={imgUrl} />
                    <div className={styles["bg-image-att"]}>
                        Photo By <a href={attributionLink}>{photoName}</a>
                    </div>
                </>
            )
        } catch (e){
            return <div>e</div>
        }
    }

    return (
        <div className="Page">
            {getBgImage()}
            <button onClick={handleClick} className={styles.button} value="login!"/>
            <input type="text" id="tf-username"></input>
        </div>
    )   
}

export default LoginPage