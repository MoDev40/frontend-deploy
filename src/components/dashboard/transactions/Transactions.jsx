import React, { useEffect, useState } from 'react'
import TransactionTable from './TransactionTable'
import { useFetchUserTransQuery } from '@/store/features/transactionSlice'
import { Input } from '@/components/ui/input'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import CreateTransDialog from './dialogs/CreateTransDialog'

const Transactions = () => {
  const [selectedDate,setSelectedDate] = useState(new Date)
  const [counter,setCounter] = useState(1)

  const {data:transactions = []} = useFetchUserTransQuery({counter,date:selectedDate})
  useEffect(()=>{

  },[counter])


  return (
    <div className='w-full space-y-3 flex flex-col'>
      <div className='p-4 flex flex-row space-x-2 w-auto'>
        <CreateTransDialog/>
        <Input className="focus:border-none focus:outline-none" placeholder="Search"  type="search"/>
        <DatePicker className="p-2 outline-none rounded-md" selected={selectedDate} onChange={(date)=>setSelectedDate(date)} dateFormat = "dd-MM-yyyy"  
        />
      </div>
      <TransactionTable transactions={transactions}/>
      <div className='flex flex-row justify-center space-x-10 items-center'>
      <button onClick={()=>{setCounter((prevCoun)=> prevCoun > 1 ? prevCoun -1 : prevCoun)}}><FaArrowLeft/></button>
      <span>{counter}</span>
      <button  onClick={()=>{setCounter((prevCoun)=> prevCoun +1)}}><FaArrowRight/></button>
    </div>
    </div>
  )
}

export default Transactions