import React, { useEffect, useState } from 'react'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { propertyCategories } from '@/context/data'
import { CircleUserRound, Edit, Paperclip, Star } from 'lucide-react'
import { Button } from './ui/button'
import { getUserId } from '@/app/actions'
import { useRouter } from 'next/navigation'

function HotelReview({userId, property_id }) {
     const router = useRouter();
     const [starRating, setStarRating] = useState(1);
     const [message, setMessage] = useState("");
     const [reviews, setReviews] = useState([]);
     const [finish, setFinish] = useState(false);


     const handleTextArea = (message)=>{
        if(message.length > 100){
            return "Maximum 100 characters allowed."
        }
        setMessage(message)
     }

     const fetchReviews = async ()=>{
        const res = await fetch(`/api/review?property_id=${property_id}`);
        const data = await res.json();
        console.log(data);
        setReviews(data);
    }
     useEffect(()=>{
        fetchReviews();
     },[])

     const saveReview = async ()=>{
        const loadData = {
            userId,
            property_id,
            rating:starRating,
            message,
        }

         const response = await fetch("/api/review",{
             method:"POST",
             headers:{
                 "Content-Type": "application/json",
             },
             body: JSON.stringify(loadData)
         })
         if(response.ok){
             setStarRating("")
             setMessage("")
             fetchReviews();
         }else{
             alert("Failed to save review.")
         }
     }
  return (
    <div className='mt-[70px] mb-[50px]'>
            <div className='text-xl mb-5 font-bold'>Read Reviews</div>
    
           <Carousel className="mx-auto w-[90%]">
            <CarouselContent>
    {
        reviews?.map((c,index)=>(
                <CarouselItem className="basis-1/4" key={index}>
                    <div className='w-full h-[300px] relative border border-gray-300 p-3'>
                        <div className="flex ">
                            <div className='w-[40px] h-[40px] rounded-full overflow-hidden'>
                                <CircleUserRound className='w-full h-full text-primary'/>
                            </div>
                            <div className='ml-[10px] w-full'>
                                <div className='text-sm text-gray-500'>{c?.userId?.name}</div>
                                <div className='text-sm text-gray-600'>{c?.userId?.email}</div>
                            </div>
                        </div>
                        <div className='mt-2'>
                        {Array.from({ length: c?.rating }, (_, index) => (
            
                                <span key={index} style={{ fontSize: '15px', color: 'gold' }}>⭐</span>
                            ))}
                        </div>

                        <div className='border border-gray-300 rounded-md p-2 text-xs mt-3'>
                            {c?.message}
                        </div>
                    </div>
    
                </CarouselItem>
        ))
    }
                
                
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            </Carousel>
    
            <div className='mt-3 '>
                    <Dialog>
                    <DialogTrigger asChild>
                        <Button className="">Write Reviews<Edit className='inline ms-2 text-xs'/> </Button>
                    </DialogTrigger>
                    <DialogContent className="w-1/3 h-[500px] overflow-y-auto">
                    <DialogTitle>
                    Write Review Here 
                    <div className="flex gap-3 mt-3 mb-3">
                        {
                        [1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} onClick={()=>setStarRating(star)} className={`h-7 w-7 ${starRating >= star? "text-yellow-500" : "text-gray-300"}`} />
                        ))
                        }
                    
                    </div>
                    <textarea className='border border-primary rounded-md p-2 ' rows={7} cols={40} onChange={(e)=>handleTextArea(e.target.value)}>

                    </textarea><br />
                    <Button className="mt-3" onClick={()=>saveReview()}>Submit Review</Button>
                    </DialogTitle>
                    </DialogContent>
                    </Dialog>
            </div>
        </div>
  )
}

export default HotelReview


