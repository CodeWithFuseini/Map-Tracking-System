import { useSelector } from "react-redux";
import { isLogin } from "../slices/user";
import { Navigate, Outlet } from "react-router-dom";

import { user } from "../slices/user";

const RequiredAuth = () => {
    const isAuth = useSelector((state) => isLogin(state));
    const currentUser = useSelector((state) => user(state))

  return (
    <>

     { (isAuth && currentUser?.user) ? (<Outlet />)  : (<Navigate to={'/login'} replace={true} />) }
     

    </>
  )
}

export default RequiredAuth