import { getToken, removeToken } from '@/lib/cookies'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { FaSignOutAlt } from 'react-icons/fa'

const Header = () => {
    const token = getToken()
  return (
        <div className='flex flex-row items-center px-8 py-4 justify-around '>
            <div className='text-2xl font-black'>
                <Link to="/">Trade-Trace</Link>
            </div>
            <div className=' space-x-6 items-center'>
                {
                    token ?
                    <>
                    <Link to="/dashboard"><Button>Dashboard</Button></Link>
                    <Button onClick={removeToken}><FaSignOutAlt/></Button>
                    </>
                    :
                    <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                    </>
                }
            </div>

        </div>
  )
}

export default Header