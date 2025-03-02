'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function SignupPage() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm_password,setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const validateForm = ()=>{
    const errors = {};
    if(!name){
      errors.name = "Name is required";
    }
    if(!email){
      errors.email = "Email is required";
    }else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    
    if(!password){
      errors.password = "Password is required";
    }
    if(password.length < 6){
      errors.length = "Password length should be at least 6 characters";
    }
    else if(password!== confirm_password){
      errors.confirm_password = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSignup = async(e)=>{
    e.preventDefault();
    if(validateForm()){
      try{
        const response = await fetch("http://localhost:3000/api/signup",{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name,email,password})
        });
        
        if(!response.ok){
          const {message,status} = await response.json();
          setErrors((prevErrors)=>({...prevErrors,message:message}));
        }

        router.push('/login');
      }catch(error){
        console.log(error);
      }
    }
  }
  return (
    <div className='flex justify-center w-full pt-10' style={{margin:0}}>
        <div className='border-primary border shadow-xl min-h-[90%] flex flex-col w-2/5 items-center justify-center bg-white p-5 rounded-lg'>
            <div className='w-full '>
              <Link href="/"><ArrowLeft/></Link>
            </div>
            <div className='logo text-3xl font-bold mb-2'>Booking App</div>
            <p className='mb-5'>Sign up here!</p>
            <form action="" className='w-full' method="post" onSubmit={handleSignup}>
                <label htmlFor="" className='text-sm'>Name</label>
                <span className='text-red-500 text-sm ms-5'>{errors.name && `[${errors.name}]`}</span>
                <Input type="text" placeholder="Name"  className="mb-5 " value={name} onChange={(e)=>setName(e.target.value)}/>
                
                <label htmlFor="" className='text-sm'>Email</label>
                <span className='text-red-500 text-sm ms-5'>{errors.email && `[${errors.email}]`}</span>
                <span className='text-red-500 text-sm ms-5'>{errors.message && `[${errors.message}]`}</span>
                <Input type="text" placeholder="Email"  className="mb-5 " value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  
                <label htmlFor="" className='text-sm'>Password</label>
                <span className='text-red-500 text-sm ms-5'>{errors.password && `[${errors.password}]`}</span>
                <span className='text-red-500 text-sm ms-5'>{errors.length && `[${errors.length}]`}</span>
                <Input type="password" className="mb-5" placeholder="Password " value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <label htmlFor="" className='text-sm'>Confirm Password</label>
                <span className='text-red-500 text-sm ms-5'>{errors.confirm_password && `[${errors.confirm_password}]`}</span>
                <Input type="password" placeholder="Password " value={confirm_password} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                <Button className="mt-5">Sign Up</Button>
            </form>
            <div className='mt-3'>Already have an account ? <Link href='/login' className='text-primary underline'>Login</Link> </div>
        </div>
    </div>
  )
}

export default SignupPage