import { useContext } from "react";
import MainPage from "./app/components/MainPage/MainPage";
import LoginPage from "./app/components/LoginPage/LoginPage";
import { loginContext } from "./app/contexts/Contexts";

//TODO: Add calendar mode

export default function App() {
    const { isLogin } = useContext(loginContext)

    return (
        isLogin ? <MainPage /> : <LoginPage />
    )
    // return <MainPage /> 
}