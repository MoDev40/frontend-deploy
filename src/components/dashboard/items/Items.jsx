import React, { useEffect, useState } from 'react'
import CreateItemDialog from './dialogs/CreateItemDialog'
import 'react-datepicker/dist/react-datepicker.css'
import { useFetchCategoryQuery } from '@/store/features/categorySlice'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { useFetchUserItemQuery } from '@/store/features/itemSlice'
import ItemTable from './ItemTable'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
const Items = () => {
  const [counter,setCounter] = useState(1)
  const [category,setCategory] = useState({id:0})
  const {data:categories = []} = useFetchCategoryQuery()
  const {data:items = [],isLoading} = useFetchUserItemQuery({counter:counter,typeID:category.id})
  useEffect(()=>{
    setCounter(1)
  },[category.id])
  
  return (
    <div className='w-full space-y-3 flex flex-col'>
      <div className='p-4 flex flex-row space-x-2 w-auto'>
      <CreateItemDialog/>
      <Select onValueChange={ value => { setCategory({...category,id:parseInt(value)})}}>
        <SelectTrigger>Filter-By</SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem  value={0}>None</SelectItem>
            {
              categories&& 
              categories.map( category => (
                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
      {
        category.id == 0 
        ?
        <ItemTable  items={items}/>
        :
        <ItemTable items={items}/>
      }
        <div className='flex flex-row justify-center space-x-10 items-center'>
        <button onClick={()=>{setCounter((prevCoun)=> prevCoun > 1 ? prevCoun -1 : prevCoun)}}><FaArrowLeft/></button>
        <span>{counter}</span>
        <button  onClick={()=>{setCounter((prevCoun)=> prevCoun +1)}}><FaArrowRight/></button>
        </div>
    </div>
  )
}

export default Items