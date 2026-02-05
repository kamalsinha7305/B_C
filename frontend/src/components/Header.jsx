import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import { Link } from 'react-router-dom'
import { FaUserAstronaut } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import {useLocation} from 'react-router-dom'

function Header() {

  const [isMobile] =useMobile();
    const location = useLocation();
   

   const isSearchPage =location.pathname =='/search';



  return (
    <header className='h-15 lg:h-18 lg:shadow-md sticky top-0 '>
       {
        !(isSearchPage && isMobile) && (
          <div className='conatiner  w-full h-full mx-auto flex items-center px-2 justify-between '>

        <div className='h-full'>
          <Link to={"/"} className='h-full flex justify-center items-center '>
            <img src={logo} width={100} height={50} alt="Logo" className='hidden lg:block'/>
            <img src={logo} width={100} height={50} alt="Logo" className='lg:hidden '/>
          </Link>
  
        </div>

        <div className="hidden lg:block">
         <Search/>
        </div>

        <div className="">
          <div className='lg:hidden'>
            <FaUserAstronaut size={25}/>
          </div>
          <div className='hidden lg:block'>
          Login into the cart 
          </div>
        </div>

      </div>
        )
       }
      <div className='conatiner mx-auto px-2 lg:hidden ' >
        <Search/>
      </div>

    </header>
  )
}

export default Header