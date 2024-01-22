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
import { infoToast, successToast } from '@/lib/toasts'
import { useDeleteNotifMutation, useFetchUserNotifQuery } from '@/store/features/notificationSlice'
import { FaTrash } from "react-icons/fa"
const NotificationTable = () => {
  const {data:notifications = []} = useFetchUserNotifQuery()
  const [deleteMutate] = useDeleteNotifMutation()
  const handlDlete = async(id)=>{
    await deleteMutate(id).unwrap().then((data)=>{
      successToast(data.message)
    }).catch((error) =>{
     infoToast(error.data.message)
    })
}
  return (
    <Table>
    <TableCaption>A list of lasest notifications...</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">ID</TableHead>
        <TableHead>ItemID</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-left">Message</TableHead>
        <TableHead className="text-right">Delete</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {notifications.map(notif => (
        <TableRow key={notif.id}>
          <TableCell className="font-medium">{notif.id}</TableCell>
          <TableCell>{notif.notifId}</TableCell>
          <TableCell>{new Date(notif.createdAt.split("T")[0]).toDateString()}</TableCell>
          <TableCell  className="text-left">{notif.message}</TableCell>
          <TableCell  className="text-right"><Button onClick={()=>{handlDlete(notif.id)}} className="bg-red-400 hover:bg-red-500"><FaTrash/></Button></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  )
}

export default NotificationTable