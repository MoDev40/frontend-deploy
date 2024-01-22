import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from '@/components/ui/button'
  import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
  import React, { useEffect, useState } from 'react'
  import { FaEye, FaPrint, FaSyncAlt } from 'react-icons/fa'
  import {useFetchMonthlyItemRepQuery} from "@/store/features/reportSlice"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
  const MonthyItemRepDialog = () => {
    const [itemID,setItemID] = useState()
    const [currentDate,seCurrentDate] = useState()
    const handlePrint = ()=>{
      window.print()
    }
    const {data:report = {},isSuccess} = useFetchMonthlyItemRepQuery({date:currentDate,id:itemID})
    useEffect(()=>{
        if(itemID>0){
          seCurrentDate(new Date())
        }
    },[itemID])
    console.log(report);
    const handleChange = (event)=>{
      event.preventDefault()
      setItemID(event.target.value)
    }
    return (
      <Dialog>
        <DialogTrigger className="w-full"><Button className='w-full'><FaEye/></Button></DialogTrigger>
        <DialogContent>
          <div>
            <Label>ItemID</Label>
            <Input onChange={handleChange} type="number"/>
          </div>
          <div className='flex flex-row items-center space-x-5'>
            <DatePicker className="p-2 space-y-2  border rounded-md" selected={currentDate} onChange={(date)=>{seCurrentDate(date)}} dateFormat = "dd-MM-yyyy"  
            />
            <Button>Re-Generate</Button>
         </div>
          <Table>
          <TableCaption className="p-6">
          <div className="w-full mb-2 flex flex-row justify-between space-x-3">
          <Button className="w-full" ><FaSyncAlt/></Button>
          <Button className="w-full" onClick={handlePrint}><FaPrint/></Button> 
          </div>  
          Daily Reports...</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left font-bold">Transaction Type</TableHead>
              <TableHead className="text-left font-bold">Quantity</TableHead>
              <TableHead className="text-left font-bold">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              isSuccess&&
              <>
              <TableRow>
                <TableCell className="text-left">In</TableCell>
                <TableCell className="text-left">{report?.inTrans?.quantity}</TableCell>
                <TableCell className="text-left">{isSuccess&& '$'}{report?.inTrans?.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Out</TableCell>
                <TableCell className="text-left">{report?.outTrans?.quantity}</TableCell>
                <TableCell className="text-left">{isSuccess&& '$'}{report?.outTrans?.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell  className="text-left">Total</TableCell>
                <TableCell  className="text-left">{report?.inTrans?.quantity+report?.outTrans?.quantity}</TableCell>
                <TableCell  className="text-left">${report?.inTrans?.price+report?.outTrans?.price}</TableCell>
              </TableRow>
              </>
            }
          </TableBody>
          <TableFooter>
          <TableRow>
            <TableCell  colSpan={2}  className="text-left">Revenue</TableCell>
            <TableCell  className="text-left">{isSuccess&& `$${report?.inTrans?.price-report?.outTrans?.price}`}</TableCell>
          </TableRow>
          </TableFooter>
          </Table>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default MonthyItemRepDialog