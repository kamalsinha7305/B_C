import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className='h-18 shadow-md sticky top-0'>
      <div className='conatiner mx-auto flex items-center h-full px-2 justify-between'>

        <div className='h-full'>
          <Link to={"/"} className='h-full flex justify-center items-center '>
            <img src={logo} width={100} height={50} alt="Logo" className='hidden lg:block'/>
            <img src={logo} width={100} height={50} alt="Logo" className='lg:hidden '/>
          </Link>
  
        </div>

        <div>
         <Search/>
        </div>

        <div>
          Login into the cart 
        </div>

      </div>

    </header>
  )
}

export default Header