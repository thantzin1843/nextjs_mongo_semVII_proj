import Navbar from '@/components/Navbar'
import SearchHotelForm from '@/components/SearchHotelForm'
import React from 'react'

function Hero() {

  return (
   <>
     <Navbar/>
      <div className='relative w-full'>
          <div className='' style={{
              backgroundImage: "url('/mount_hotel.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "150px",
              borderRadius:"10px",
              overflow:'hidden',
            }}>
              <div className="text-white texl-5xl w-full h-full flex flex-col justify-center items-center ">
                <div className='text-4xl text-white font-extrabold'>Book your stay with us!</div>
                
              </div>
          </div>

          <SearchHotelForm />

          
      </div>
   </>
  )
}

export default Hero