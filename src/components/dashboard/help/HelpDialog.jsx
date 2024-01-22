import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FaQuestion } from 'react-icons/fa'

const HelpDialog = () => {
  return (
    <Dialog>
    <DialogTrigger asChild><button className='flex flex-row space-x-3 items-center cursor-pointer'><FaQuestion/><Label>Help</Label></button></DialogTrigger>
    <DialogContent className="p-10">
        <Input type="email" placeholder='Email'/>
        <textarea className='w-full p-2 border border-[#ccc] rounded-md' name="hepl" id="" cols="30" rows="10" placeholder='Message'></textarea>
        <Button>Submit</Button>
    </DialogContent>
    </Dialog>
  )
}

export default HelpDialog