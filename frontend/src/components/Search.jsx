import React from 'react'
import { CiSearch } from 'react-icons/ci';
import { TypeAnimation } from 'react-type-animation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
function Search() {
  const navigateTo = useNavigate();
  const location = useLocation();

  const [isSearchPage, setIsSearchPage] = useState(false);
  
  useEffect(() => {
    const isSeacrh = location.path === '/search'
    setIsSearchPage(isSeacrh)
  },[isSearchPage]); 


  const redirectToSearchPage = () => {
    navigateTo('/search')
  }

  console.log("search",isSearchPage);
 
  return (
    <div className='  min-w-65 lg:min-w-100 lg:h-10 rounded border bg-slate-50 flex items-center  overflow-hidden cursor-pointer'>
      <button className='flex justify-center items-center h-full p-3 text-neutral-600 '>
        <CiSearch size={22} />
      </button>

      <div className=" w-full h-full ">
        {
        !isSearchPage?(

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