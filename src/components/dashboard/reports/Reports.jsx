import React from 'react'
import MonthRepDialog from './dialogs/MonthRepDialog'
import DailyRepDialog from './dialogs/DailyRepDialog'
import {BiCalendarEvent} from 'react-icons/bi'
import {BiCalendar} from 'react-icons/bi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DailyItemRepDialog from './dialogs/DailyItemRepDialog'
import MonthyItemRepDialog from './dialogs/MonthyItemRepDialog'
const Reports = () => {
  return (
    <div className='grid grid-cols-2 gap-5 p-6 font-mono'>
      <div>
      <Card className="p-6 capitalize">
        <CardHeader>
          <CardTitle className="font-black text-2xl">Monthly Report</CardTitle>
          <CardDescription><BiCalendar/><p className='mt-2'>Monthly report based on All Transactions</p></CardDescription>
        </CardHeader>
        <CardContent >
        <MonthRepDialog/>
        </CardContent>
      </Card>
      </div>
      <div>
      <Card className="p-6 capitalize">
        <CardHeader>
          <CardTitle className="font-black text-2xl">Daily Report</CardTitle>
          <CardDescription><BiCalendarEvent/> <p className='mt-2'>Daily report based on All Transactions</p></CardDescription>
        </CardHeader>
        <CardContent>
        <DailyRepDialog/>
        </CardContent>
      </Card>
      </div>
      <div>
      <Card className="p-6 capitalize">
        <CardHeader>
          <CardTitle className="font-black text-2xl">Monthly Report</CardTitle>
          <CardDescription><BiCalendar/><p className='mt-2'>Monthly report based on Items</p></CardDescription>
        </CardHeader>
        <CardContent >
          <MonthyItemRepDialog/>
        </CardContent>
      </Card>
      </div>
      <div>
      <Card className="p-6 capitalize">
        <CardHeader>
          <CardTitle className="font-black text-2xl">Daily Report</CardTitle>
          <CardDescription><BiCalendarEvent/> <p className='mt-2'>Daily report based on Item</p></CardDescription>
        </CardHeader>
        <CardContent>
          <DailyItemRepDialog/>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default Reports