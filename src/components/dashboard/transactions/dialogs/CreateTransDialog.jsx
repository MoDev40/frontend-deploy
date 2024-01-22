import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { successToast } from '@/lib/toasts'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useCreateTransactionMutation } from '@/store/features/transactionSlice'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const CreateTransDialog = ({item}) => {
    const navigate = useNavigate() 
    const [createMutate,{error,isLoading}] = useCreateTransactionMutation()
    const [formData,setFormData] = useState({
        itemID:item?.id,
        date: new Date(),
        transType:"in",
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
          successToast(data?.message)
          navigate('/dashboard/items')
        }).catch((error)=>{
          successToast(error.data?.message)
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
        <Label>itemID</Label>
        <Input required  onChange={handleCahnge}  value={item?.id} placeholder="Enter itemID" name="itemID" type="text"/>
        </div>
        <div>
        <Label>Date </Label>
        <p className='text-sm font-light'>Default now</p>
        <DatePicker className="p-2 space-y-2 w-full border rounded-md" selected={formData?.date} onChange={(date)=>{setFormData({...formData ,date:date})}} dateFormat = "dd-MM-yyyy"  
        />
        </div>
        <div>
        <Label>transactionType</Label>
        <Select onValueChange={ value =>{setFormData({...formData ,transType:value})}}>
        <SelectTrigger>{formData.transType}</SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>TransactionType</SelectLabel>
            <SelectItem value="in">In</SelectItem>
            <SelectItem value="out">Out</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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

export default CreateTransDialog