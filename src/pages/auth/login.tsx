import { Link } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"
import { instance } from "../../config/axios-instance"
import { Input } from 'antd';

const Login = () => {
    const { user, setUser, setToken, token } = useAuthStore((store) => store)
    const loginHandler = async () => {
        const res = await instance.post("/auth/login", {
            username: "johndoe",
            password: "password123"
        })
        console.log(res);

        setUser(res.data.user)
        setToken(res.data.data.accessToken)
    }
    return (
        <div className="flex w-[1200px] h-[690px] justify-center items-center ml-[150px]">
            <div className="flex flex-col justify-center items-center w-[450px] h-[315px] gap-[40px]">
                <h1 className="font-medium text-[32px] text-center text-[#0e1427]">Tizimga kirish</h1>
                <div className="flex flex-col gap-[30px] w-[450px]">
                    <Input placeholder="Login" variant="underlined" />
                    <Input placeholder="Parol" variant="underlined" />
                </div>
                <div className="flex flex-col">
                    {token ? <p>{user.full_name}</p> : <button 
                    className="w-[450px] h-[64px] bg-[#7d41ed] rounded-[10px] font-medium text-[18px] text-center text-[#fff]" 
                    onClick={loginHandler}>Kirish</button>}
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </div>
        </div>
    )
}

export default Login