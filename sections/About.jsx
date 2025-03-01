import { Button } from '@/components/ui/button'
import React from 'react'

function About() {
  return (
    <div className='flex justify-center flex-wrap w-[90%] mx-auto'>
        <div className="w-1/3 h-[320px] rounded-xl overflow-hidden">
        <img src='https://www.luxurylink.com/images/sho_6070bab2/2579418_617-630/image-2579418_617.jpg' className='w-full h-full'/>
        </div>
        <div className="w-2/3 p-3 flex">
        <div className="text-3xl font-semibold p-5">Book Your Perfect Stay , Discover Comfort and Luxury</div>
        <div className='mt-3 p-5'>
        Find the ideal hotel for your next getaway! Enjoy seamless booking, exclusive deals, and top-notch customer service. Start your journey with us today and make unforgettable memories!
        <br /><Button className="mt-3">Learn More</Button>
        </div>
        
        </div>

    </div>
  )
}

export default About