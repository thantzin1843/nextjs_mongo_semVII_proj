'use client'
import { doCredentialLogin } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(event) {
    event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);
        // console.log(formData);
        const response = await doCredentialLogin(formData);

        if (!!response.error) {
            console.error(response.error);
            setError(response.error.message);
        } else {
            router.push("/");
        }
    } catch (e) {
        console.error(e);
        setError("Wrong email or password!");
    }
}
  return (
    <div className='flex justify-center w-full pt-20 ' style={{margin:0}}>
        <div className='border-primary border shadow-xl min-h-3/4 flex flex-col w-2/5 items-center justify-center bg-white p-5 rounded-lg'>
            <div className='w-full '>
            <Link href="/"><ArrowLeft/></Link>
            </div>
            <div className='logo text-3xl font-bold mb-2'>Booking App</div>
            <p className='mb-5'>Sign in to manage your deals and bookings</p>
            <div className="text-md text-red-500">{error}</div>
            <form action="" method="post" onSubmit={handleLogin} className='w-full'>
                <label htmlFor="" className='text-sm'>Email</label>
                <Input type="text"  name="email" placeholder="Email"  className="mb-5 " />

                <label htmlFor="" className='text-sm'>Password</label>
                <Input type="password" name="password"  placeholder="Password "/>
                <Button className="mt-5">Sign In</Button>
            </form>
            <div className='mt-3'>Create an account ? <Link href='/signup' className='text-primary underline'>Signup</Link> </div>
        </div>
    </div>
  )
}

export default LoginPage