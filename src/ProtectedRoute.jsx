import React from 'react'
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const {autenticado,loading} = useSelector(state => state.user);
    if(!autenticado || loading) {
        if(loading){
            return(<Loading/>)
        }else{
            return <Navigate to='/login' replace/>
        }
    }else{
        return  <Outlet/>
    }
    
    
}

export default ProtectedRoute