import React from 'react'
import { ArrowRightCircle, ExternalLinkIcon, Hotel, Images } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { propertyCategories } from '@/context/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
function Room() {
  return (
    <div className='w-1/3 p-1'>
                <div className="border border-primary shadow rounded-lg w-full overflow-hidden relative">
                <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    { propertyCategories.map((c,index)=>(
                    <CarouselItem key={index}>

                        <Card>
                            <CardContent className="w-full bg-red-500">
                            <div className="w-full h-[170px]">
                                <img src={c.image} className='w-full h-full'/>
                            </div>
                           
                            </CardContent>
                        </Card>

                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
                            <div className="absolute top-1 left-1 text-white bg-[#00000088] p-1 rounded">
                               <Images className='me-2 inline'/>5
                            </div>
                    <div className="p-3 flex flex-col justify-between  min-h-[350px]">
                   <div>
                   <div className='text-xl mb-2 font-bold text-primary'>
                        Superior Twin Rooms
                    </div>
                    <div className="flex items-center mb-2 gap-2">
                        <div className='bg-black p-2 rounded-md text-white'>3.0</div>
                        <div className='text-sm'>
                            <div className="font-bold">Very good</div>
                            <div>5 reviews</div>
                        </div>
                    </div>
                    <div>
                        {
                            [1,2,3,4,5].map((n,index)=>{
                                return(
                                    <div key={index} className='text-xs mb-1'><Hotel className='inline me-1'/> Free Wifi</div>
                                )
                            })
                        }
                    </div>
                    <div className='mt-1'>
                        <Link className="text-blue-500 text-sm" href="">More Detail<ArrowRightCircle className='inline ms-2 text-xs'/> </Link>
                    </div>
                    </div>
                    <div className='flex justify-between '>
                        <div><span className='font-bold text-xl'>$60</span> per night</div>
                        <div>
                            <Button>Reserve</Button>
                        </div>
                    </div>
                    </div>


                </div>
            </div>
  )
}

export default Room