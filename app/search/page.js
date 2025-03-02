'use client'
import HotelCard from '@/components/HotelCard';
import SearchHotelForm from '@/components/SearchHotelForm'
import { Checkbox } from '@/components/ui/checkbox';
import { all_facilities, funThings, propertyAccessibility, propertyCategories } from '@/context/data';
import { Database, SortAsc, SortDesc, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';
import HotelCardOne from '@/components/HotelCardOne';
  

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
    const router = useRouter()
      
    const searchParams = useSearchParams();
    const location = searchParams.get('location') || '';
    const checkin = searchParams.get('from') || '';
    const checkout = searchParams.get('to') || '';
    const noOfGuests = searchParams.get('no_of_guests') || '';
    const petAllowed = searchParams.get('pet') || false;
    const [categories, setCategories] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [loading, setloading] = useState(true);

    // additional
    const [rating, setRating] = useState([]);
    const [breakfast, setBreakfast] = useState(false);
    const [children , setChildren] = useState(false);
    const [party, setParty] = useState(false);
    const [smoking ,setSmoking] = useState(false);
    const [fthings, setFunThings] = useState([]);
    const [pa, setPropertyAccessibility] = useState([]);

    // end of additional
 
    const [rooms, setRooms] = useState([]);

    const selectCategories = (item) =>{
        setCategories((prev)=>
            prev.includes(item) ? prev.filter((cate) => cate !== item) : [...prev, item]
        );
        // console.log(facilities);
      }
      const selectFacilities = (item) =>{
        setFacilities((prev)=>
            prev.includes(item) ? prev.filter((facility) => facility !== item) : [...prev, item]
        );
        // console.log(facilities);
      }
      const selectRating = (item) =>{
        setRating((prev)=>
            prev.includes(item) ? prev.filter((rating) => rating !== item) : [...prev, item]
        );
      }

      const selectFunThings = (item) =>{
        setFunThings((prev)=>
            prev.includes(item) ? prev.filter((fun) => fun !== item) : [...prev, item]
        );
      }

      const selectPropertyAccess = (item) =>{
        setPropertyAccessibility((prev)=>
            prev.includes(item) ? prev.filter((access) => access !== item) : [...prev, item]
        );
      }


      const searchProperty = async () => {
        setloading(true);
        const queryParams =  new URLSearchParams({
            location, from:checkin, to:checkout,  no_of_guests: noOfGuests, // Number of guests filter
            pet: petAllowed,breakfast,children,party,smoking
        });
        categories.forEach(category => {
            queryParams.append('categories', category);
        });
        facilities.forEach((facility) => {
            queryParams.append('facilities', facility);
        });
        rating.forEach((rate) => {
            queryParams.append('rating', rate);
        });
        fthings.forEach((f) => {
            queryParams.append('funThings', f);
        });
        pa.forEach((p) => {
            queryParams.append('propertyAccessibilities', p);
        });

        console.log("before fetching in /search page query"+queryParams.toString());

        const response = await fetch(`/api/search?${queryParams.toString()}`,{method:'GET'});
        const data = await response.json();
        // console.log("Client available rooms ="+JSON.stringify(data));
        console.log(data);
        setRooms(data);
        setloading(false);
      }
      
      useEffect(()=>{
        searchProperty();
      },[facilities,categories,rating,breakfast,children,party,smoking,fthings,pa])


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
        <iframe src={rooms[0]?.property_id?.location?.mapLink} className='w-full h-full' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        {/* Property type */}
        <div className='my-3'>
            <div className='font-bold'>Property type</div>
                            {
                                categoriesToShow.map((item,index)=>{
                                    // const checked = selectedFunThings.includes(item);
                                return (
                                    <div className="flex items-center space-x-2 mt-2 " key={index}>
                                    <Checkbox id={item.name} onClick={()=>selectCategories(item.name)}/>
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
                                    <Checkbox id={star} onClick={()=>selectRating(star)}/>
                                    {/* <Checkbox onClick={()=>}/> */}
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
                                    <Checkbox id={item} onClick={()=>selectFacilities(item)}/>
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
                                    <Checkbox onClick={()=>setBreakfast(!breakfast)}/>
                                    <label
                                        htmlFor="Breakfast included"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Breakfast included
                                    </label>
                                    </div>
                                  

                                    <div className="flex items-center space-x-2 my-2 ">
                                    {/* <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/> */}
                                    <Checkbox onClick={()=>setChildren(!children)}/>
                                    <label
                                        htmlFor="Breakfast included"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Children allowed
                                    </label>
                                    </div>  
                                    <div className="flex items-center space-x-2 my-2 ">
                                    <Checkbox onClick={()=>setParty(!party)}/>
                                    <label
                                        htmlFor="Breakfast included"
                                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Party allowed
                                    </label>
                                    </div>     
                                    <div className="flex items-center space-x-2 my-2 ">
                                    <Checkbox onClick={()=>setSmoking(!smoking)}/>
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
                                                    <Checkbox id={item} onClick={()=>selectFunThings(item)}/>
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
                                                    <Checkbox id={item} onClick={()=>selectPropertyAccess(item)}/>
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
        {/* <div className='flex flex-end items-center'>
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

        </div> */}

            {/* hotel card */}
            {
              loading && (
                <div className=" flex mx-auto w-1/2 flex-col items-center justify-center">
                      <div className="w-8 h-8 border-4 mb-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p>Searching rooms</p>
                </div>
              )
            }
            {
                !loading && (
                    (rooms?.length > 0 ) ? (
                        rooms?.map((room,index)=>(
                            <HotelCardOne room={room} key={index}/>
                        ))
                    ):(
                        <div className='flex justify-center text-xl text-gray-400'><Database className='inline me-3'/> No room is found.</div>
                    )
                )
                
            }

        </div>

        </div>
    </div>
  )
}

export default page