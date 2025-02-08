'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeClosed } from 'lucide-react'
import React, { useState } from 'react'

function page() {
  const [show, setShow] = useState(false)
  return (
    <div className='mt-5 '>
      <form action="" className='w-2/3 mx-auto shadow-md p-5'>
      <div className='text-3xl'>Hotel Register Form</div>
      <label className='text-sm'>Name</label>
      <Input type='text' placeholder="Hotel name" className="mb-3 border border-primary"/>
      <label className='text-sm'>Email</label>
      <Input type='text' placeholder="Hotel email" className="mb-3 border border-primary"/>
      <label className='text-sm'>Password</label>
      <div className='flex flex-row gap-3'><Input type={show ? "text" : 'password'} placeholder="Password" className="mb-3 border border-primary"/><Button onClick={(e)=>{
        e.preventDefault()
        setShow(!show)
        }} className=''>
        {show ? <Eye/> : <EyeClosed/>}
        </Button> </div>
      <label className='text-sm'>Due Date</label>
      <Input type='date' placeholder="Hotel email" className="mb-3 border border-primary"/>
      <Button type='submit'>Create Hotel</Button>
      </form>
    </div>
  )
}

export default page