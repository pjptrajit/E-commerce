import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../store/UserContext';

function Header() {
  const navigate = useNavigate;
  const{setUser} = useContext(GlobalContext);
  async function logout(){
    let res = await fetch("http://localhost:9000/api/user/v1/userLogout",{
      method: "POST",
      credentials: "include"
    });

    await res.json();

  }
 
  return (
    <div className='w-full h-[10vh] flex justify-center items-center gap-5 border'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login" onClick={()=>{
          logout();
         setUser(null);
         navigate('/login');
        }}>Logout</NavLink>
        <NavLink to="/login">Login</NavLink>


    </div>
  )
}

export default Header