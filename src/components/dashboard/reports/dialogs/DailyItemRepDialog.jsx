import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from '@/components/ui/button'
  import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
  import React, { useEffect, useState } from 'react'
  import { FaEye, FaPrint, FaSyncAlt } from 'react-icons/fa'
  import {useFetchDailyItemRepQuery} from "@/store/features/reportSlice"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
  const DailyItemRepDialog = () => {
    const [itemID,setItemID] = useState({})
    const handlePrint = ()=>{
      window.print()
    }
    const {data:report = {},isSuccess} = useFetchDailyItemRepQuery(itemID)
    useEffect(()=>{
      if(itemID>0){
      }
    },[itemID])
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
                <TableCell className="text-left">{report.intTrans&& '$'}{report?.inTrans?.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-left">Out</TableCell>
                <TableCell className="text-left">{report?.outTrans?.quantity}</TableCell>
                <TableCell className="text-left">{report.outTrans&& '$'}{report?.outTrans?.price}</TableCell>
              </TableRow>
              </>
            }
          </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default DailyItemRepDialog