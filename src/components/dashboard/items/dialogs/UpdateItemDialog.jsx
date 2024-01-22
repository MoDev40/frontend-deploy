import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import SelectType from '../Select'
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useUpdateItemMutation } from '@/store/features/itemSlice'
import { infoToast, successToast } from '@/lib/toasts'
const UpdateItemDialog = ({item}) => {
  const [updateItemMutate,{isLoading}] = useUpdateItemMutation()
    const [formData,setFormData] = useState({
        itemName:"",
        itemDesc:"",
        itemType:0,
        price:0,
        isAvailable:true,
      })

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
        setFormData({isAvailable:item.availability,price:item.price,itemName:item.name,itemDesc:item.description,itemType:item.typeID})
      }

      const handleSubmit = async(event)=>{
        event.preventDefault();
          await updateItemMutate({updated:formData,id:item.id}).unwrap().then((data)=>{
            successToast(data.message)
          }).catch((error)=>{
            infoToast(error.data.message)
          })
      }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button onClick={handleUpdatedValue}><FaEdit/></Button>
        </DialogTrigger>
    <DialogContent>
        <form action="" onSubmit={handleSubmit} className='space-y-3 p-4  capitalize'>
        <p className='text-md font-thin '>Updating Items Quantity   You can go in transaction flied for security and maintenable reasons....</p>
        <div>
        <Label>Name</Label>
        <Input required value={formData.itemName} onChange={handleCahnge} placeholder="Enter ItemName" name="itemName" type="text"/>
        </div>
        <div>
        <Label>Desc</Label>
        <Input  value={formData.itemDesc} onChange={handleCahnge} placeholder="Enter ItemDesc" name="itemDesc" type="text"/>
        </div>
        <div>
        <Label>Type</Label>
        <SelectType setFormData={setFormData} formData={formData}/>
        </div>
        <div>
        <Label>Price</Label>
        <Input required value={formData.price} onChange={handleCahnge} placeholder="Enter Price " name="price" type="number"/>
        </div>
        <div className='flex items-center space-x-2'>
        <Label>isAvailable</Label>
        <input required checked={formData.isAvailable} onChange={handleCheckBox} name="isAdmin" type="checkbox"/>
        </div>
        <div className='cursor-pointer'>
        <Button>{isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span>:"Update"}</Button>
        </div>
        </form>

    </DialogContent>
    </Dialog>
  )
}

export default UpdateItemDialog