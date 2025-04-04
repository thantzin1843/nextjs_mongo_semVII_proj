import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image'
  
function TrendDestination() {
  return (
    <div className='mt-[70px] mb-[50px]'>
        <div className='text-xl mb-5 font-bold'>What kind of property are you looking for?</div>

       <Carousel className="mx-auto w-[90%]">
        <CarouselContent>

            <CarouselItem className="basis-1/4">
                <div className='w-full h-[350px]'>
                    <img src="/yangon.webp" alt='a' className='w-full h-4/5 rounded-xl'/>
                    <div class="font-bold">Yangon</div>
                    <div className='text-sm text-gray-600'>20 properties</div>
                </div>

            </CarouselItem>
            
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>

    </div>
  )
}

export default TrendDestination