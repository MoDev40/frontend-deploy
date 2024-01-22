import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { useUpdateUserMutation } from '@/store/features/userSlice'
import { infoToast, successToast } from '@/lib/toasts'
const UpdateItemDialog = ({user}) => {
  const [updateUserMutate] = useUpdateUserMutation()
  const [formData,setFormData] = useState({
    id:0,
    username:"",
    email:"",
    password:"",
    isAdmin: false
  })

  const handleSubmit = async(event)=>{
    event.preventDefault();
      await updateUserMutate({updated:formData,id:user.id}).unwrap().then((data)=>{
        successToast(data.message)
      }).catch((error)=>{
        infoToast(error.data.message)
      })
  }
  const handleCahnge = (event)=>{
     event.preventDefault();
     const {name,value} = event.target
     setFormData({...formData,[name]:value})
     console.log(formData);
  }

  const handleCheckBox = ()=>{
    setFormData({...formData,isAdmin:!formData.isAdmin})
  }

  const handleUpdatedValue = ()=>{
    setFormData({id:user.id,username:user.username,password:user.password,email:user.email,isAdmin:user.isAdmin})
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button onClick={handleUpdatedValue}><FaUserEdit/></Button>
        </DialogTrigger>
    <DialogContent>
              <form action="" onSubmit={handleSubmit} className='space-y-4 p-4'>
                <div>
                <Label>Username</Label>
                <Input required value={formData.username}  onChange={handleCahnge} placeholder="Enter username" name="username" type="text"/>
                </div>
                <div>
                <Label>Email</Label>
                <Input required value={formData.email}  onChange={handleCahnge} placeholder="Enter email" name="email" type="email"/>
                </div>
                <div>
                <Label>Password</Label>
                <Input required value={formData.password}  onChange={handleCahnge} placeholder="Enter password " name="password" type="password"/>
                </div>
                <div className='flex items-center space-x-2'>
                <Label>isAdmin</Label>
                <input  checked={formData.isAdmin} onChange={handleCheckBox} name="isAdmin" type="checkbox"/>
                </div>
                <div className='cursor-pointer w-full flex flex-col'>
                <Button>{isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span>:"Save"}</Button>
                </div>
              </form>
    </DialogContent>
    </Dialog>
  )
}

export default UpdateItemDialog