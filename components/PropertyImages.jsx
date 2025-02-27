import { Images } from 'lucide-react'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
function PropertyImages({images}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
    <div className='w-full flex h-[300px]'>
        <div className='w-2/4 h-full'>
           {images &&  <img src={process.env.NEXT_PUBLIC_URL_ENDPOINT+images[0]?.name} className='w-full h-full border border-white' alt="" />}
        </div>
        <div className='w-1/4 h-full'>
        {images && <img src={process.env.NEXT_PUBLIC_URL_ENDPOINT+images[1]?.name} className='w-full h-1/2 border border-white' alt="" />}
        <div className='relative w-full h-1/2'>
        {(images && images[2]) && <img src={process.env.NEXT_PUBLIC_URL_ENDPOINT+images[2]?.name} className='w-full h-full border border-white' alt="" />}
        <div className='absolute  right-5 top-5 bg-[#000000aa] text-white rounded-xl p-2 flex gap-1'>
          <Images className="text-[10px]"/>{images?.length}+
        </div>
        </div>
        </div>
        
    </div>
    </DialogTrigger>
    <DialogContent className="w-2/3 h-[500px] overflow-y-auto">
    <DialogTitle>
    Property's images
    </DialogTitle>
        
        <div>All Photos</div>
        <div className="flex flex-wrap">
        {
          images?.map((item,index)=>(
            <div className="w-1/2 h-[200px] border p-1 border-white hover:border-blue-500" key={index}>
              <img src={process.env.NEXT_PUBLIC_URL_ENDPOINT+item?.name} className='w-full h-full' alt="" />
            </div>
          ))
        }

        </div>
        
      </DialogContent>
    </Dialog>

  
  )
}

export default PropertyImages