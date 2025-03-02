
import Navbar from '@/components/Navbar'
import SearchHotelForm from '@/components/SearchHotelForm'
import React from 'react'

function Hero() {
  return (
   <>
     <Navbar/>
      <div className='relative w-full mt-5'>
          <div className='' style={{
              backgroundImage: "url('/mount_hotel.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px",
              borderRadius:"10px",
              overflow:'hidden',
            }}>
              <div className="text-white texl-5xl w-full h-full flex flex-col justify-center items-center ">
                <div className='text-[35px] text-white font-extrabold'>Book your stay with us!</div>
                <div className='text-[20px] text-white '>Find the ideal hotel for your next getaway!</div>
                
              </div>
          </div>

          <SearchHotelForm />

          
      </div>
   </>
  )
}

export default Hero