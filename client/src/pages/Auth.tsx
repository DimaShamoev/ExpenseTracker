import React, { useState } from "react";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const Auth: React.FunctionComponent = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            
            const data = await AuthService.login({email, password})

            if(data) {
                setTokenToLocalStorage('token', data.token)
                dispatch(login(data))
                toast.success("You Logged In")
                navigate('/')
            }
        
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const data = await AuthService.registration({ email, password });
        
            if (data) {
                toast.success("Account Has Been Created");
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };
    

    return (
        <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
            <h1 className="mb-10 text-center text-xl">
                {isLogin ? 'Log In' : "Registration"}
            </h1>

            <form
                className="flex w-1/3 flex-col mx-auto gap-5"
                onSubmit={isLogin ? loginHandler : registrationHandler}
            >
                <input
                    type="text"
                    className="input"
                    placeholder="Enter Email" 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="input"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-green mx-auto cursor-pointer w-full flex items-center justify-center">Submit</button>
            </form>

            <div className="flex justify-center mt-5">
                {
                    isLogin ? (
                        <button
                            className="text-slate-300 cursor-pointer hover:text-white"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            You Don't Have An Account
                        </button>
                    ) : (
                        <button
                            className="text-slate-300 cursor-pointer hover:text-white"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            Already Have An Account
                        </button>
                    )
                }
            </div>

        </div>
    );
};

export default Auth;
