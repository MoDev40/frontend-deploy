import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
import UpdateItemDialog from "./dialogs/UpdateItemDialog"
import { Button } from "@/components/ui/button"
import CreateTransDialog from "../transactions/dialogs/CreateTransDialog"
import { FaTrash } from "react-icons/fa"
export function ItemTable({items}) {
    return (
      <Table>
        <TableCaption>A list of lasest items.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead >Status</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Transaction</TableHead>
            <TableHead className="text-right">Update</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.type.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.availability ? "Available":"UnAvailable"}</TableCell>
              <TableCell  className="text-right">${item.price}</TableCell>
              <TableCell  className="text-right"><CreateTransDialog  item={item}/></TableCell>
              <TableCell  className="text-right"><UpdateItemDialog item={item}/></TableCell>
              <TableCell  className="text-right"><Button className="bg-red-400 hover:bg-red-500"><FaTrash/></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

export default ItemTable