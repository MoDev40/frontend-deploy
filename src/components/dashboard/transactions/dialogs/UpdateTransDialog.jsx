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
import { useUpdateTransactionMutation } from '@/store/features/transactionSlice'
import { FaEdit } from 'react-icons/fa'
const UpdateTransDialog = ({transaction}) => {
    const [updateMutate,{error,isLoading}] = useUpdateTransactionMutation()
    const [formData,setFormData] = useState({
        itemID:transaction?.itemId,
        transID:transaction?.id,
        date: new Date(transaction?.timestamp),
        transType:transaction.transactionType,
        quantity:transaction.quantity,
      })
      
      const handleCahnge = (event)=>{
        event.preventDefault();
        const {name,value} = event.target
        setFormData({...formData,[name]:value})
      }
      const handleSubmit = async(event)=>{
        event.preventDefault();
        await updateMutate(formData).unwrap().then((data)=>{
          successToast(data.message)
        }).catch((error)=>{
          console.log(error);
          successToast(error.data.message)
        })
      }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button><FaEdit/></Button>
        </DialogTrigger>
    <DialogContent>

        <form  onSubmit={handleSubmit} action="" className='space-y-3 p-3  capitalize'>
        <div>
        <Label>transID</Label>
        <Input required  onChange={handleCahnge}  value={transaction?.id} placeholder="Enter TransactionID" name="transID" type="text"/>
        </div>
        <div>
        <Label>itemID</Label>
        <Input required   onChange={handleCahnge}  value={transaction?.itemId} placeholder="Enter itemID" name="itemID" type="text"/>
        </div>
        <div>
        <Label>Date </Label>
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
        <Input required value={formData.quantity} onChange={handleCahnge} placeholder="Enter Quantity " name="quantity" type="number"/>
        </div>
        <div className='cursor-pointer'>
        <Button>{isLoading ? <span className="h-4 w-4 border-t-2 border-b-2 border-white border-solid rounded-full animate-spin"></span>:"Save"}</Button>
        </div>
        </form>

    </DialogContent>
    </Dialog>
  )
}

export default UpdateTransDialog