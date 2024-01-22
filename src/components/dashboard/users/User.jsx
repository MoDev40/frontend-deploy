import React from 'react'
import UpdateUserDialog from './dialogs/UpdateUserDialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useFetchUsersQuery } from '@/store/features/userSlice'
import { FaTrash } from 'react-icons/fa'

const User = () => {
  const {data:users = []} = useFetchUsersQuery()
  console.log(users);
  return (
    <Table>
    <TableCaption>A list of  categories.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>Username</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Password</TableHead>
        <TableHead className="text-right">Update</TableHead>
        <TableHead className="text-right">Delete</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.password&& `${user.password.slice(0,5)}........`}</TableCell>
              <TableCell  className="text-right"><UpdateUserDialog user={user}/></TableCell>
              <TableCell  className="text-right"><Button onClick={()=>{handlDlete(user.id)}} className="bg-red-400 hover:bg-red-500"><FaTrash/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  )
}

export default User