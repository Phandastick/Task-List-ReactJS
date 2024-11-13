import { useContext, useEffect } from "react";
import MainPage from "./app/MainPage";
import LoginPage from "./app/components/LoginPage/LoginPage";
import { loginContext, Providers } from "./app/contexts/Contexts";

export default function App() {
    const { isLogin, setLogin } = useContext(loginContext)

    return (<Providers>
        {
            isLogin ? <MainPage /> : <LoginPage />
        }
        </Providers>
    )
}