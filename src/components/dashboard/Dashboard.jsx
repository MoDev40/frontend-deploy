import React, { useEffect, useState } from 'react'
import DashboardHeader from './DashboardHeader'
import { Navigate, Outlet } from 'react-router-dom'
import { useCreateNotifMutation } from '@/store/features/notificationSlice'
import { infoToast } from '@/lib/toasts'
import { getToken } from '@/lib/cookies'

const Dashboard = () => {
  const [notifMutate] = useCreateNotifMutation()
  const [isPosted,setIsPosted] = useState(false)
  const token = getToken()
  useEffect(()=>{
    if(isPosted){
      console.log("Rendered");
      async function postData() {
        await notifMutate().unwrap().then((data)=>{
          infoToast(data.message)
        }).catch((error)=>{
          console.log(error)
          infoToast(error.data?.message)
        })
      }
      postData();
    }
    setIsPosted(true)
  },[isPosted])
  if(!token) return <Navigate to="/login" />
  return (
    <div className='flex  flex-row space-x-10'>
        <DashboardHeader/>
        <Outlet/>
    </div>
  )
}

export default Dashboard