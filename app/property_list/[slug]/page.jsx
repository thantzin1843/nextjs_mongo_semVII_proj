
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

function page() {
    // const id = params.slug;
  return (
    <section className="bg-white dark:bg-gray-900 mt-5">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Create Your Listing and make revenue.</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">It can take as little as 15 minutes to finish your listing – click continue to start where you left off</p>
            <Link href="/property_list/create/step1" className="inline-flex text-white items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary ">
                Create New Listing
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
            <div className='text-3xl mt-5 '>Your Previous Property Listings</div>
            <div className="flex mt-2 justify-between p-2 items-center gap-10 border-b border-gray-300">
              <div className='text-xl font-bold'>
                Cedona Hotel
              </div>
              <Link href="/"><Button className="bg-blue-500 hover:bg-blue-600">Continue Editing</Button></Link>

            </div>
            
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex h-[300px]">
            <img src="https://jaanveertoursandtravels.com/assets/img/product/tour/hotel.jpg" alt="mockup"/>
        </div>                
    </div>
</section>
  )
}

export default page