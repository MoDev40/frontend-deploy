import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useLoginMutation } from '@/store/features/userSlice'
import { setToken } from '@/lib/cookies'
import { successToast, warningToast } from '@/lib/toasts'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({
    username:"",
    password:"",
  })

  const [mutate,{isLoading}] = useLoginMutation()
  const handleSubmit = async(event)=>{    
    event.preventDefault();
    await mutate(formData).unwrap().then((data)=>{
      setToken(data.token)
      successToast(data.message)
    }).catch((err)=>{
      warningToast(err.data?.message)
    }).finally(()=>{
      navigate("/")
      window.location.reload()
    })
  }

  const handleCahnge = (event)=>{
    event.preventDefault();
    const {name,value} = event.target
    setFormData({...formData,[name]:value})
    console.log(formData);
  }
  
  return (
    <div className='max-w-xl mx-auto p-10'>
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} action="" className='space-y-4 p-4'>
                <div>
                <Label>Username</Label>
                <Input required onChange={handleCahnge} placeholder="Enter username" name="username" type="text"/>
                </div>
                <div>
                <Label>Password</Label>
                <Input required onChange={handleCahnge} placeholder="Enter password " name="password" type="password"/>
                </div>
                <div className='flex flex-col space-y-4 cursor-pointer'>
                <Label>Forget Password ?</Label>
                <Button>{isLoading ? <span className="h-8 w-8 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span>:"Login"}</Button>
                </div>
                </form>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Login