import React from 'react'
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
import { FaTrash } from 'react-icons/fa'
import UpdateCategDailog from './dialog/UpdateCategDailog'
import { useDeleteCategoryMutation } from '@/store/features/categorySlice'
import { infoToast, successToast } from '@/lib/toasts'
const Category = ({categories}) => {
  const [deleteCategMutate] = useDeleteCategoryMutation()
  const handlDlete = async(id)=>{
      await deleteCategMutate(id).unwrap().then((data)=>{
        successToast(data.message)
      }).catch((error) =>{
      infoToast(error.data.message)
      })
  }
  return (
    <Table>
    <TableCaption>A list of  categories.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead className="text-right">Update</TableHead>
        <TableHead className="text-right">Delete</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
          {categories.map(category => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell  className="text-right"><UpdateCategDailog category={category}/></TableCell>
              <TableCell  className="text-right"><Button onClick={()=>{handlDlete(category.id)}} className="bg-red-400 hover:bg-red-500"><FaTrash/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  )
}

export default Category