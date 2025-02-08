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
        <div className='text-xl mb-5 font-bold'>Trending Destinations in Myanmar</div>

       <Carousel className="mx-auto w-[90%]">
        <CarouselContent>
            <CarouselItem className="basis-1/6">
                <div className='w-full h-[250px] overflow-hidden'>
                    <div className='w-full h-4/6 overflow-hidden rounded-xl'>
                        <Image src="/yangon.webp" width={100} height={200} className='w-full h-full hover:scale-105'/>
                    </div>
                    
                    <div className="font-bold">Yangon</div>
                    <div className='text-sm text-gray-600'>20 properties</div>
                </div>

            </CarouselItem>

            <CarouselItem className="basis-1/6">
                <div className='w-full h-[200px]'>
                    <Image src="/yangon.webp" width={100} height={200} className='w-full h-4/5 rounded-xl'/>
                    <div class="font-bold">Yangon</div>
                    <div className='text-sm text-gray-600'>20 properties</div>
                </div>

            </CarouselItem>
            <CarouselItem className="basis-1/6">
                <div className='w-full h-[200px]'>
                    <Image src="/yangon.webp" width={100} height={200} className='w-full h-4/5 rounded-xl'/>
                    <div class="font-bold">Yangon</div>
                    <div className='text-sm text-gray-600'>20 properties</div>
                </div>

            </CarouselItem>
            <CarouselItem className="basis-1/6">
                <div className='w-full h-[200px]'>
                    <Image src="/yangon.webp" width={100} height={200} className='w-full h-4/5 rounded-xl'/>
                    <div class="font-bold">Yangon</div>
                    <div className='text-sm text-gray-600'>20 properties</div>
                </div>

            </CarouselItem>
            <CarouselItem className="basis-1/6">
                <div className='w-full h-[200px]'>
                    <Image src="/yangon.webp" width={100} height={200} className='w-full h-4/5 rounded-xl'/>
                    <div class="font-bold">Yangon</div>
                    <div className='text-sm text-gray-600'>20 properties</div>
                </div>

            </CarouselItem><CarouselItem className="basis-1/6">
                <div className='w-full h-[200px]'>
                    <Image src="/yangon.webp" width={100} height={200} className='w-full h-4/5 rounded-xl'/>
                    <div class="font-bold">Yangon</div>
                    <div className='text-sm text-gray-600'>20 properties</div>
                </div>

            </CarouselItem>
            <CarouselItem className="basis-1/6">
                <div className='w-full h-[200px]'>
                    <Image src="/yangon.webp" width={100} height={200} className='w-full h-4/5 rounded-xl'/>
                    <div class="font-bold">Yangon</div>
                    <div className='text-sm text-gray-600'>20 properties</div>
                </div>

            </CarouselItem>
            <CarouselItem className="basis-1/6">
                <div className='w-full h-[200px]'>
                    <Image src="/yangon.webp" width={100} height={200} className='w-full h-4/5 rounded-xl'/>
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