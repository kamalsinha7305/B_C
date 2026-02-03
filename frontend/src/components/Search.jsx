import React from 'react'
import {CiSearch} from 'react-icons/ci';
import { TypeAnimation } from 'react-type-animation';

function Search() {

  const redirectToSearchPage =()=>{
    const navigateTo = useNavigate
  }
  return (
    <div className='  min-w-65 lg:min-w-100 lg:h-10 rounded border bg-slate-50'>
    <button className='flex justify-center items-center h-full p-3 text-neutral-600 '>
        <CiSearch size={22} />
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
    </button>
    <div className=''>
       
    </div>
    </div>
  )
}

export default Search