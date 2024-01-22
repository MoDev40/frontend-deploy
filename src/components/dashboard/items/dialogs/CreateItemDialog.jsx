import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import SelectType from '../Select'
import { useCreateItemMutation } from '@/store/features/itemSlice'
import { successToast } from '@/lib/toasts'
import { FaPlus } from 'react-icons/fa'

const CreateItemDialog = () => {
    const [createMutate,{isLoading,isError,isSuccess}] = useCreateItemMutation()
    const [formData,setFormData] = useState({
        itemName:"",
        itemDesc:"",
        itemType:0,
        price:0,
        quantity:0,
      })
      
      const handleCahnge = (event)=>{
        event.preventDefault();
        const {name,value} = event.target
        setFormData({...formData,[name]:value})
      }
      const handleSubmit = async(event)=>{
        event.preventDefault();

          await createMutate(formData).unwrap().then((data)=>{
            successToast(data.message)
          }).catch((error)=>{
            infoToast(error.data.message)
          })
      }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button><FaPlus/></Button>
        </DialogTrigger>
    <DialogContent>

        <form  onSubmit={handleSubmit} action="" className='space-y-3 p-3  capitalize'>
        <div>
        <Label>itemName</Label>
        <Input required  onChange={handleCahnge} placeholder="Enter ItemName" name="itemName" type="text"/>
        </div>
        <div>
        <Label>itemDesc</Label>
        <Input   onChange={handleCahnge} placeholder="Enter ItemDesc" name="itemDesc" type="text"/>
        </div>
        <div>
        <Label>itemType</Label>
        <SelectType   setFormData={setFormData} formData={formData}/>
        </div>
        <div>
        <Label>price</Label>
        <Input required  onChange={handleCahnge} placeholder="Enter Price " name="price" type="number"/>
        </div>
        <div>
        <Label>quantity</Label>
        <Input required  onChange={handleCahnge} placeholder="Enter Quantity " name="quantity" type="number"/>
        </div>
        <div className='cursor-pointer'>
        <Button>{isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span>:"Save"}</Button>
        </div>
        </form>

    </DialogContent>
    </Dialog>
  )
}

export default CreateItemDialog