import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaPlus } from 'react-icons/fa';
import { useCreateCategoryMutation } from '@/store/features/categorySlice';
import { successToast } from '@/lib/toasts';
import { infoToast } from '@/lib/toasts';
const CreateCategDialog = () => {
    const [createCategMutate,{isLoading}] = useCreateCategoryMutation()
    const [formData,setFormData] = useState({
        catName:"",
      })
      
      const handleCahnge = (event)=>{
        event.preventDefault();
        setFormData({catName:event.target.value})
      }
      const handleSubmit = async(event)=>{
        event.preventDefault();
        try {          
          await createCategMutate(formData).unwrap().then((data)=>{
            successToast(data.message)
          })
        }catch (error) { 
            infoToast(error.data.message)   
        }
      }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button><FaPlus/></Button>
        </DialogTrigger>
    <DialogContent>

        <form  onSubmit={handleSubmit} action="" className='space-y-3 p-3  capitalize'>
        <div>
        <Label>Name</Label>
        <Input required  onChange={handleCahnge} placeholder="Enter Name" name="catName" type="text"/>
        </div>
        <div className='cursor-pointer'>
        <Button>{isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span>:"Save"}</Button>
        </div>
        </form>
    </DialogContent>
    </Dialog>
  )
}

export default CreateCategDialog