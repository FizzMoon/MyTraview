import { MenuOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavMainPage = () => {

  const [active, setActive] = useState(false)

  const showMenu = () => {
    setActive(!active)
  }

  return (

    <div className='fixed flex items-center justify-between w-full text-white bg-transparent' style={{zIndex: 9999}}>

      <div className='text-2xl font-bold text-center uppercase'>
        <h1>My <span className='block text-3xl'>Traview</span></h1>
      </div>

      <nav>

        <div className='absolute scale-150 right-6 md:hidden top-6'>
          <MenuOutlined onClick={showMenu} className='scale-150 cursor-pointer'/>
        </div>

        <ul className='hidden gap-8 p-6 md:flex bg-white/10'>
          <li><a href="#s1">Home</a></li>
          <li><a href="#s2">17도</a></li>
          <li><a href="#s3">Reviews</a></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
          
        </ul>


      </nav>

    </div>

  )
}

export default NavMainPage