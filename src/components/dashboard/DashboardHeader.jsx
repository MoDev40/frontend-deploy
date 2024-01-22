import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import HelpDialog from './help/HelpDialog'
import {FaBell, FaBox, FaChartBar, FaExchangeAlt, FaHome,FaUsers} from 'react-icons/fa'
import {BiSolidCategory} from 'react-icons/bi'
import { Label } from '../ui/label'
import { useFetchLogedUserQuery } from '@/store/features/userSlice'
import { removeToken } from '@/lib/cookies'

const DashboardHeader = () => {
  const currentDate = new Date()
  const {data:user} = useFetchLogedUserQuery()
  useEffect(() => {
    let expireDate = new Date(currentDate.getTime() + user?.expiresIn*60*100)
      if(currentDate >= expireDate){
        removeToken()
      }
  },[])
  return (
    <div className='flex  flex-col cursor-pointer space-y-8 min-h-screen p-6 shadow-md rounded-sm font-semibold text-xl'>
        <Link to="/" >
        <div className='flex flex-row space-x-3 items-center'>
        <FaHome/><Label>Home</Label>
        </div>
        </Link>
        {
          user?.logedUser?.isAdmin ?
          <>
          <Link to="/dashboard/users" >
          <div className='flex flex-row space-x-3 items-center'>
          <FaUsers/><Label>Users</Label>
          </div>
          </Link>

          <Link to="/dashboard/categories" >
          <div className='flex flex-row space-x-3 items-center'>
          <BiSolidCategory/><Label>Categories</Label>
          </div>
          </Link>
          </>
          :
          <>
          <Link to="/dashboard/items" >
          <div className='flex flex-row space-x-3 items-center'>
          <FaBox/><Label>Inventory</Label>
          </div>
          </Link>

          <Link to="/dashboard/reports" >
          <div className='flex flex-row space-x-3 items-center'>
          <FaChartBar/><Label>Reports</Label>
          </div>
          </Link>

          <Link to="/dashboard/transactions" >
          <div className='flex flex-row space-x-3 items-center'>
          <FaExchangeAlt/><Label>Transactions</Label>
          </div>
          </Link>

          <Link to="/dashboard/notifications" >
          <div className='flex flex-row space-x-3 items-center '>
          <FaBell/><Label>Notifications</Label>
          </div>
          </Link>
          <HelpDialog/>
          </>
        }
    </div>
  )
}

export default DashboardHeader