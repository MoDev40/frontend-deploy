import Register from '@/components/credentials/Register'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const CreateUserDialog = () => {
  return (
    <Dialog>
        <DialogTrigger asChild><Button>+</Button></DialogTrigger>
        <DialogContent>
          <div className='w-full'>
            <Register/>
          </div>
        </DialogContent>
    </Dialog>
  )
}

export default CreateUserDialog