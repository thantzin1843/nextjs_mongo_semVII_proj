import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import Image from 'next/image'
import { propertyCategories } from '@/context/data'
  
function PropertyCategory() {
  return (
    <div className='mt-[70px] mb-[50px]'>
        <div className='text-xl mb-5 font-bold'>What kind of property are you looking for?</div>

       <Carousel className="mx-auto w-[90%]">
        <CarouselContent>
{
    propertyCategories.map((c,index)=>(
            <CarouselItem className="basis-1/4" key={index}>
                <div className='w-full h-[300px] relative'>
                    <img src={c.image} alt={c.name} className='w-full h-full rounded-xl'/>
                    <div class="font-bold absolute bottom-3 w-full bg-white text-primary p-3">{c.name}</div>
                </div>

            </CarouselItem>
    ))
}
            
            
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>

    </div>
  )
}

export default PropertyCategory