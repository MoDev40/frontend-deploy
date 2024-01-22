import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { useUpdateCategoryMutation } from '@/store/features/categorySlice';
import { infoToast, successToast } from '@/lib/toasts';
const UpdateCategDailog = ({category}) => {
    const [updateCategMutate,{isLoading}] = useUpdateCategoryMutation()
    const [formData,setFormData] = useState({
        catName:category.name,
      })
      const handleCahnge = (event)=>{
        event.preventDefault();
        setFormData({catName:event.target.value})
      }
      const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log(formData);
        try {          
          await updateCategMutate({updateCateg:formData,id:category.id}).unwrap().then((data)=>{
            successToast(data.message)
          })
        }catch (error) { 
          infoToast(error.data.message)
        }
      }
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button onClick={()=>{setFormData({catName:category.name})}}><FaEdit/></Button>
    </DialogTrigger>
    <DialogContent>

    <form  onSubmit={handleSubmit} action="" className='space-y-3 p-3  capitalize'>
    <div>
    <Label>Name</Label>
    <Input required value={formData.catName} onChange={handleCahnge} placeholder="Enter Name" name="Name" type="text"/>
    </div>
    <div className='cursor-pointer'>
    <Button>{isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span>:"Update"}</Button>
    </div>
    </form>
    </DialogContent>
    </Dialog>
  )
}

export default UpdateCategDailog