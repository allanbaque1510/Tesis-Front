import { createContext, useContext, useEffect } from "react";
import Axios from '../api/auth'
import {useDispatch } from 'react-redux';
import { useLocation ,useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { login,logout,setErrorLogin,clearErrorLogin } from "../redux/reducer.js";
export const AuthContext = createContext()
export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("UseAuth Deberia estar dentro de un provider")
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const singup = async(user) =>{
        try {
            const res = await Axios.registerRequest(user);
            Cookies.set('token', res.data.token); 
            dispatch(login(res.data));
            
        } catch (error) {
            console.log(error.response)
        }
    }

    const signin = async(user) =>{
            Axios.loginRequest(user)
            .then(res=>{
                    Cookies.set('token', res.data.token); 
                    dispatch(clearErrorLogin());
                    dispatch(login(res.data));
                    navigate('/dashboard');
            })
            .catch(error=>{
                dispatch(setErrorLogin(error.response.data));
            })
    }

    const logOut= () =>{
        Cookies.remove("token");
        dispatch(logout());
    }

    const checkToken = async()=>{    
        const cookie=Cookies.get();
        if(cookie.token){
            try {
                const res = await Axios.verifyToken(cookie.token)
                if(!res.data){
                    return 
                } 
                dispatch(login(res.data));
            } catch (error) {
                Cookies.remove("token");
                dispatch(logout());
            }
        }else{
            navigate('/login');
        }
    }

    useEffect(() => {
        checkToken()
    }, [])
    

    return(
        <AuthContext.Provider value={{
            singup,
            signin,
            logOut,
            }}>
            {children}
        </AuthContext.Provider>
        )
}