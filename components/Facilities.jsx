import { all_facilities, bathroomItems, breakfastOptions, funThings, propertyAccessibility } from '@/context/data'
import { Accessibility, AlertCircle, Bath, Check, PartyPopper, Utensils } from 'lucide-react'
import React from 'react'

function Facilities() {
  return (
    <div>
        <div className="text-2xl">Facilities of Grand Yangon</div>
        <div className="flex">
            <div className="w-1/3 p-3">
                <div>
                    <div className=" text-md font-bold mb-3"><AlertCircle size={20} className='inline me-1'/> General</div>
                    <div>
                        {
                            all_facilities.map((item,index)=>(
                                <div className="flex gap-2 text-xs my-1" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <div className=" text-md font-bold mb-3"><PartyPopper size={20} className='inline me-1'/> Fun Things To Do</div>
                    <div>
                        {
                            funThings.map((item,index)=>(
                                <div className="flex gap-2 text-xs my-1" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="w-1/3 p-3">
            <div>
                    <div className=" text-md font-bold mb-3"><Accessibility size={20} className='inline me-1'/> Accessibility</div>
                    <div>
                        {
                            propertyAccessibility.map((item,index)=>(
                                <div className="flex gap-2 text-xs my-1" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <div className=" text-md font-bold mb-3"><Utensils size={20} className='inline me-1'/>Food offers</div>
                    <div>
                        {
                            breakfastOptions.map((item,index)=>(
                                <div className="flex gap-2 text-xs my-1" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="w-1/3 p-3">
            <div>
                    <div className=" text-md font-bold mb-3"><Bath size={20} className='inline me-1'/> Bathroom</div>
                    <div>
                        {
                            bathroomItems.map((item,index)=>(
                                <div className="flex gap-2 text-xs my-1" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Facilities