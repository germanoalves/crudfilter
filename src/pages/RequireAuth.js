import { Navigate, Outlet } from "react-router-dom";



export const RequireAuth = ({children}) => {
    
    // const isAuth = false;
    const isAuth2 = localStorage.getItem("senha");
    if( isAuth2 !== "123"){
        return <Navigate to="/login"/>
    }else {
        return children;
    }
}