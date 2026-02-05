import React from 'react'
import { CiSearch} from 'react-icons/ci';
import { IoMdArrowBack } from "react-icons/io";
import { TypeAnimation } from 'react-type-animation';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import useMobile from '../hooks/useMobile';
function Search() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  useEffect(() => {
    const isSeacrh = location.pathname === '/search'
    setIsSearchPage(isSeacrh)
  },[location.pathname]); 

  const redirectToSearchPage = () => {
    navigateTo('/search')
  }
 
  return (
    <div className='  min-w-65 lg:min-w-100 h-9 lg:h-10 rounded border bg-slate-50 flex items-center  overflow-hidden cursor-pointer  group focus-within:border-primary-100'>
      {
      (isMobile && isSearchPage ) ? (
         <Link to={"/"}>
          <button className='flex justify-center items-center h-full p-3 text-neutral-600 group-focus-within:text-primary-100 ' >
            <IoMdArrowBack size={22} />
          </button>
      </Link>
      ): (        
      <div>
          <button className='flex justify-center items-center h-full p-3 text-neutral-600 group-focus-within:text-primary-100 ' >
            <CiSearch size={22} />
          </button>
      </div>
      )
      }
      <div className=" w-full h-full flex  items-center ">
        {
        (!isSearchPage)?(

           <div onClick={redirectToSearchPage} >
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed once, initially
          'Search for Products',
          1000,
          'Search for Brands',
          1000,
          'Search for Categories',
          1000,
          'Search for Stores',
          1000,
        ]}
        speed={50}
        style={{ fontSize: 'sm' }}
        repeat={Infinity}
      />
      </div>   
        ): (
          <div className='w-full '>
            <input type="text" placeholder=" Search for atta dal and more "  className='bg-transparent w-full h-full outline-none'  autoFocus />
          </div>
        )
        }
      </div>
     

    </div>
  )
}

export default Search