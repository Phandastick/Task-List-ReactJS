import { useContext } from "react";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import { loginContext } from "./contexts/Contexts";

//TODO: Add calendar mode

export default function App() {
    const { isLogin } = useContext(loginContext)

    return (
        isLogin ? <MainPage /> : <LoginPage />
    )
    // return <MainPage /> 
}