import React, { useState } from 'react'
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
import { FaTrash } from 'react-icons/fa'
import UpdateTransDialog from './dialogs/UpdateTransDialog'

const TransactionTable = ({transactions}) => {
  return (
    <>
    <Table>
    <TableCaption>A list of transactions.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead className="w-[100px]">ItemID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead >Status</TableHead>
        <TableHead >Date</TableHead>
        <TableHead className="text-right">Update</TableHead>
        <TableHead className="text-right">Delete</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {transactions&& transactions.map(transaction => (
        <TableRow key={transaction.id}>
          <TableCell className="font-medium">{transaction.id}</TableCell>
          <TableCell>{transaction.itemId}</TableCell>
          <TableCell>{transaction.item.name}</TableCell>
          <TableCell>{transaction.quantity}</TableCell>
          <TableCell>{transaction.transactionType}</TableCell>
          <TableCell>{new Date(transaction.timestamp.split('T')[0]).toDateString()}</TableCell>
          <TableCell  className="text-right"><UpdateTransDialog transaction={transaction} /></TableCell>
          <TableCell  className="text-right"><Button className="bg-red-400 hover:bg-red-500"><FaTrash/></Button></TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={8}></TableCell>
      </TableRow>
    </TableFooter>
  </Table>

    </>
  )
}

export default TransactionTable