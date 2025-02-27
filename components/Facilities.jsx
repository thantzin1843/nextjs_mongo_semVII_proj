import { all_facilities, bathroomItems, breakfastOptions, funThings, propertyAccessibility } from '@/context/data'
import { Accessibility, AlertCircle, Bath, Check, PartyPopper, Utensils } from 'lucide-react'
import React from 'react'

function Facilities({property}) {
  return (
    <div>
        <div className="text-2xl">Facilities of Grand Yangon</div>
        <div className="flex">
            <div className="w-1/3 p-3">
                <div>
                    <div className=" text-md font-bold mb-3"><AlertCircle size={20} className='inline me-1'/> General</div>
                    <div>
                        {
                            property?.facilities?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <div className=" text-md font-bold mb-3"><PartyPopper size={20} className='inline me-1'/> Fun Things To Do</div>
                    <div>
                        {
                            property?.fun_things_todo?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1" key={index}><Check size={15}/>{item} </div>
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
                            property?.property_accessibility?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1" key={index}><Check size={15}/>{item} </div>
                            ))
                        }
                    </div>
                </div>
                <div className='mt-5'>
                    <div className=" text-md font-bold mb-3"><Utensils size={20} className='inline me-1'/>Food offers</div>
                    <div>
                        {property?.food_and_dining?.serve_breakfast && <div className="flex gap-2 text-md my-1" ><Check size={15}/>Includ breakfast </div>}
                        {property?.food_and_dining?.free_breakfast && <div className="flex gap-2 text-md my-1" ><Check size={15}/>Free breakfast </div>}
                        {
                            property?.food_and_dining?.selected_foods?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1" key={index}><Check size={15}/>{item} </div>
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
                            property?.bathroom_info?.items?.map((item,index)=>(
                                <div className="flex gap-2 text-md my-1" key={index}><Check size={15}/>{item} </div>
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