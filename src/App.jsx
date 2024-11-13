import { useContext, useEffect } from "react";
import { MainPage } from "./app/MainPage";
import { LoginPage } from "./app/components/LoginPage/LoginPage";
import { loginContext } from "./providers/AuthContext";

export default function App() {
    const { isLogin, setLogin } = useContext(loginContext)

    return (<>
        {
            isLogin ? <MainPage /> : <LoginPage />
        }
        </>
    )
}