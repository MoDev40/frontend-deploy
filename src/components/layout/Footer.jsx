import React from 'react'
import { Label } from '../ui/label'

const Footer = () => {
  return (
    <footer className='p-7 space-y-4'>
    <div  className='cursor-pointer  flex flex-col space-y-4 lg:flex-row justify-around'>
        <div>
            <Label>Email</Label>
            <p> modev.404@gmail.com</p>
        </div>
        <div>
            <Label>Rights-Reserved</Label>
            <p>Mukhtaar &copy; 2024</p>
        </div>
        <div>
            <Label>Github</Label>
            <p> modev.404@gmail.com</p>
        </div>
        <div>
            <Label>Portofolio</Label>
            <p>Portofolio</p>
        </div>
    </div>
</footer>
  )
}

export default Footer