import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useFetchLogedUserQuery } from '@/store/features/userSlice'
import { useUserRegisterMutation } from '@/store/features/userSlice'
import { infoToast, successToast } from '@/lib/toasts'
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const [userReg,{isLoading}] = useUserRegisterMutation() 
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    username:"",
    email:"",
    isAdmin:false,
    password:"",
  })

  const handleCahnge = (event)=>{
    event.preventDefault();
    const {name,value} = event.target
    setFormData({...formData,[name]:value})
  }
  
  const handleSubmit = async(event)=>{
    event.preventDefault();
    await userReg(formData).unwrap().then((data)=>{
      successToast(data.message)
      navigate("/login")
    }).catch((err)=>{
      infoToast(err.data?.message)
    })
  }
  const handleCheckBox = ()=>{
    setFormData({...formData,isAdmin:!formData.isAdmin})
    console.log(formData);
  }
  const {data:user} = useFetchLogedUserQuery()
  return (
    <div className='max-w-xl mx-auto p-10'>
            <Card>
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} action=""  className='space-y-4 p-4'>
                <div>
                <Label>Username</Label>
                <Input required  onChange={handleCahnge} placeholder="Enter username" name="username" type="text"/>
                </div>
                <div>
                <Label>Email</Label>
                <Input required  onChange={handleCahnge} placeholder="Enter email" name="email" type="email"/>
                </div>
                <div>
                <Label>Password</Label>
                <Input required  onChange={handleCahnge} placeholder="Enter password " name="password" type="password"/>
                </div>
                { user?.logedUser?.isAdmin&&
                <div className='flex items-center space-x-2'>
                <Label>isAdmin</Label>
                <input  onChange={handleCheckBox} name="isAdmin" type="checkbox"/>
                </div>
                }
                <div className='cursor-pointer flex flex-col '>
                <Button>{isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span>:"Save"}</Button>
                </div>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default Register