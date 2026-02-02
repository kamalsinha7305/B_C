import React from 'react'
import logo from '../assets/logo.png'
function Header() {
  return (
    <header className='h-20 shadow-md sticky top-0'>
    <div>
        <div>
            <img src={logo} width={100} height={50} alt="Logo"/>
        </div>
    </div>

    </header>
  )
}

export default Header