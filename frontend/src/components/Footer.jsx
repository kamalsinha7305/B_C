import React from 'react';
import { FaFacebook,FaInstagram ,FaLinkedin} from "react-icons/fa";

function Footer() {
  return (
    <footer className='border-t'>
      <div className='container mx-auto p-4 text-center flex flex-col gap-2'>
      <p> © All Rights Reserved 2026</p>
      <div className='flex items-center justify-center gap-4 text-2xl'>
        <a href="" className=' hover:text-primary-200'><FaFacebook/></a>
        <a href="" className=' hover:text-secondary-200'><FaInstagram/></a>
        <a href="" className=' hover:text-primary-100'><FaLinkedin/></a>
      </div>
      </div>

    </footer>
  )
}

export default Footer