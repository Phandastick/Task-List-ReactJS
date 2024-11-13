//TODO: Develop login page maybe with auth

import { useContext } from "react";
import { loginContext } from "../../contexts/Contexts";

function LoginPage() {
    const {isLogin, setLogin} = useContext(loginContext)

    const handleClick = () => {
        console.log("Confirming login...")
        setLogin(true);
    }

    return (
        <div className="Page"> Login Page 
            <button onClick={handleClick} style={width="500px"}/>
        </div>
    )   
}

export default LoginPage