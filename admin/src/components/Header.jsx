import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className='w-full h-[10vh] flex justify-center items-center gap-10 bg-black text-white font-bold'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/product'>Product</NavLink>
    </div>
  )
}

export default Header