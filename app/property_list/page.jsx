
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { LayoutDashboardIcon, MoveRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

async function page() {
    const session = await auth();
    
  return (
    <section className="bg-white dark:bg-gray-900 mt-5">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Create Your Listing and make revenue.</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">It can take as little as 15 minutes to finish your listing – click continue to start where you left off</p>
            <Link href={`/property_list/create/step1/${session._id}`} className="inline-flex text-white items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary ">
                Create New Listing <MoveRight className='inline ms-2 '/>
                
            </Link>
            <Link href={`/property_list/create/step1/${session._id}`} className="inline-flex text-white items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary ">
                Go To Dashbook <LayoutDashboardIcon className='inline ms-2 '/>
                
            </Link>
            
            
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex h-[300px]">
            <img src="https://jaanveertoursandtravels.com/assets/img/product/tour/hotel.jpg" alt="mockup"/>
        </div>                
    </div>

    <div className='text-3xl mt-5 mb-3'>Your Previous Property Listings</div>
            <div className="mt-2 w-full mb-5">
              
              <div className="border border-primary p-5 flex items-center rounded-sm shadow-md justify-between">
                <div className='text-xl '>
                  Hotel Name
                </div>
                <div>
                  <Link href="/property_list/create/property_image"><Button>Property Images</Button></Link>
                </div>
                <div>
                <Link href="/"><Button>Manage rooms</Button></Link>
                </div>
                <div className='flex gap-3'>
                <Link href="/"><Button className="bg-blue-500 hover:bg-blue-400 ">Edit</Button></Link>
                <Link href="/"><Button className="bg-red-500 hover:bg-red-400">Delete</Button></Link>
                </div>
              </div>

            </div>
</section>
  )
}

export default page