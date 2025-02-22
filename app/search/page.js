'use client'
import HotelCard from '@/components/HotelCard';
import SearchHotelForm from '@/components/SearchHotelForm'
import { Checkbox } from '@/components/ui/checkbox';
import { all_facilities, funThings, propertyAccessibility, propertyCategories } from '@/context/data';
import { SortAsc, SortDesc, Star } from 'lucide-react';
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

export const StarRating = ({ count }) => {
    return (
      <div>
        {/* Render stars based on the `count` */}
        {Array.from({ length: count }, (_, index) => (
            
          <span key={index} style={{ fontSize: '15px', color: 'gold' }}>⭐</span>
        ))}
      </div>
    );
  };
function page() {
    const [showAll, setShowAll] = useState(false);

  // Determine which items to display based on the state
    const categoriesToShow = showAll ? propertyCategories : propertyCategories.slice(0, 5);

    const [showF, setShowF] = useState(false);
    const facilitiesToShow = showF ? all_facilities : all_facilities.slice(0, 5);

    const [showFun, setShowFun] = useState(false);
    const funThingsToShow = showFun ? funThings : funThings.slice(0, 5);

    const [showAcc, setShowAcc] = useState(false);
    const accessibilityToShow = showAcc ? propertyAccessibility : propertyAccessibility.slice(0, 5);

  return (
    <div className=''>
        <SearchHotelForm/>

        <div className='w-5/6 mx-auto flex mt-5'>
        {/* left */}
           <div className='w-1/4 p-2'>
        {/* map */}
        <div className='w-full h-[150px] bg-black'>

        </div>

        {/* Property type */}
        <div className='my-3'>
            <div className='font-bold'>Property type</div>
                            {
                                categoriesToShow.map((item,index)=>{
                                    // const checked = selectedFunThings.includes(item);
                                return (
                                    <div className="flex items-center space-x-2 mt-2 " key={index}>
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox id={item.name}/>
                                    <label
                                        htmlFor={item.name}
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item.name}
                                    </label>
                                    </div>
                                )
                            })
                            }
                            {categoriesToShow.length > 4 && (
                                <button onClick={() => setShowAll(!showAll)} className='text-sm text-blue-500 underline'>
                                {showAll ? 'Show Less' : 'See More'}
                                </button>
                            )}

        </div>

        {/* star rating */}
            <div className='my-3'>
            <div className='font-bold'>Star rating</div>
                            {
                               
                                [1, 2, 3, 4, 5].map((star,index) => (
                                    <div className="flex items-center space-x-2 my-2 " key={index}>
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox />
                                    <label
                                        
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        <StarRating key={star} count={star}/>
                                    </label>
                                    </div>
                                  
                                ))
                              
                            }

        </div>

        {/* Property type */}
        <div className='my-3'>
            <div className='font-bold'>Property facilities</div>
                            {
                                facilitiesToShow.map((item,index)=>{
                                    // const checked = selectedFunThings.includes(item);
                                return (
                                    <div className="flex items-center space-x-2 mt-2 " key={index}>
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox id={item}/>
                                    <label
                                        htmlFor={item}
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {item}
                                    </label>
                                    </div>
                                )
                            })
                            }
                            {facilitiesToShow.length > 4 && (
                                <button onClick={() => setShowF(!showF)} className='text-sm text-blue-500 underline'>
                                {showF ? 'Show Less' : 'See More'}
                                </button>
                            )}

        </div>

        {/* Property type */}
        <div className='my-3'>
            <div className='font-bold'>Room offer</div>

                                    <div className="flex items-center space-x-2 my-2 ">
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox />
                                    <label
                                        htmlFor="Breakfast included"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Breakfast included
                                    </label>
                                    </div>
                                    <div className="flex items-center space-x-2 my-2 ">
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox />
                                    <label
                                        htmlFor="Breakfast included"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Pet Allowed
                                    </label>
                                    </div>

                                    <div className="flex items-center space-x-2 my-2 ">
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox />
                                    <label
                                        htmlFor="Breakfast included"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Children allowed
                                    </label>
                                    </div>  
                                    <div className="flex items-center space-x-2 my-2 ">
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox />
                                    <label
                                        htmlFor="Breakfast included"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Party allowed
                                    </label>
                                    </div>     
                                    <div className="flex items-center space-x-2 my-2 ">
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox />
                                    <label
                                        htmlFor="Breakfast included"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Smoking allowed
                                    </label>
                                    </div>     

        </div>
        
         {/* Property type */}
         <div className='my-3'>
            <div className='font-bold'>Fun things to do </div>
                              {
                                                funThingsToShow.map((item,index)=>{
                                                    // const checked = selectedFunThings.includes(item);
                                                return (
                                                    <div className="flex items-center space-x-2 mt-2 text-xs " key={index}>
                                                    <Checkbox id={item} />
                                                    <label
                                                        htmlFor={item}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {item}
                                                    </label>
                                                    </div>
                                                )
                                            })
                                            }
                                            {funThingsToShow.length > 4 && (
                                            <button onClick={() => setShowFun(!showFun)} className='text-sm text-blue-500 underline'>
                                            {showFun ? 'Show Less' : 'See More'}
                                            </button>
                                        )}

        </div>

         {/* Property type */}
            <div className='my-3'>
            <div className='font-bold'>Property accessibility</div>
                              {
                                                accessibilityToShow.map((item,index)=>{
                                                    // const checked = selectedFunThings.includes(item);
                                                return (
                                                    <div className="flex items-center space-x-2 mt-2 text-xs " key={index}>
                                                    <Checkbox id={item} />
                                                    <label
                                                        htmlFor={item}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {item}
                                                    </label>
                                                    </div>
                                                )
                                            })
                                            }
                                            {accessibilityToShow.length > 4 && (
                                <button onClick={() => setShowAcc(!showAcc)} className='text-sm text-blue-500 underline'>
                                {showAcc ? 'Show Less' : 'See More'}
                                </button>
                            )}

        </div>
        
        


           </div>

        {/* right */}
        <div className='w-3/4 p-2'>
        {/* sort bar */}
        <div className='flex flex-end items-center'>
           <SortDesc/> Sort by &nbsp; 
            <Select className="">
        <SelectTrigger className="w-[180px] border border-primary">
            <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
        </SelectContent>
        </Select>

        </div>

            {/* hotel card */}
            <HotelCard/>
            <HotelCard/>
            <HotelCard/>
        </div>

        </div>
    </div>
  )
}

export default page