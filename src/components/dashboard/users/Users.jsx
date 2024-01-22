import React ,{useState}from 'react'
import CreateUserDialog from './dialogs/CreateUserDialog'
import User from './User'
import 'react-datepicker/dist/react-datepicker.css'

const Users = () => {
  const [selectedDate,setSelectedDate] = useState(new Date)

  return (
    <div className='w-full space-y-3 flex flex-col'>
      <div className='p-4'>
        <CreateUserDialog/>
      </div>
      <User/>
    </div>
  )
}

export default Users