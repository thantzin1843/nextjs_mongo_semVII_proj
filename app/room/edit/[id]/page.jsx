'use client'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { BedDouble, BedSingle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { bathroomItems, beds, foodAndDrinks, outdoors, roomAmenities, roomNames, roomTypes, views } from '@/context/data'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
  

function page() {
    const router = useRouter();

    const params = useParams();
    const _id = params.id; 
    const [property_id, setPid] = useState("");
    const [type, settype] = useState("");
    const [name, setname] = useState("");
    const [no_of_rooms, setno_of_rooms] = useState(1);
    const [twin, settwin] = useState(1);
    const [full, setfull] = useState(0);
    const [king, setking] = useState(0);
    const [queen, setqueen] = useState(0);
    const [width, setwidth] = useState(10);
    const [no_of_guests, setno_of_guests] = useState(1);
    const [smoking, setsmoking] = useState(true);
    const [private_bathroom,setPrivateBathroom] = useState(true);
    const [outdoor_and_view, setoutdoor_and_view] = useState([]);
    const [food, setfood] = useState([]);
    const [bathroom_items, setbathroom_items] = useState([]);
    const [amenities, setamenities] = useState([]);
    const [price, setprice] = useState(0);
    const [description, setdescription] = useState("");

    const selectOutdoorAndView = (item) =>{
        setoutdoor_and_view((prev)=>
            prev.includes(item) ? prev.filter((bitem) => bitem !== item) : [...prev, item]
        );
    }

    const selectFood = (item) =>{
        setfood((prev)=>
            prev.includes(item) ? prev.filter((bitem) => bitem !== item) : [...prev, item]
        );
    }

    const selectBathroomItems = (item) =>{
        setbathroom_items((prev)=>
            prev.includes(item) ? prev.filter((bitem) => bitem !== item) : [...prev, item]
        );
      }

      const selectAmenities = (item) =>{
        setamenities((prev)=>
            prev.includes(item) ? prev.filter((bitem) => bitem !== item) : [...prev, item]
        );
      }

      const fetchRoom = async () => {
              const res = await fetch(`/api/room/edit?room_id=${_id}`);
              const data = await res.json();
            //   console.log(data?.room[0]);
              setPid(data?.room[0]?.property_id);
              settype(data?.room[0]?.type);
              setname(data?.room[0]?.name);
              setno_of_rooms(data?.room[0]?.no_of_rooms);
              settwin(data?.room[0]?.twin);
              setfull(data?.room[0]?.full);
              setking(data?.room[0]?.king);
              setqueen(data?.room[0]?.queen);
              setPrivateBathroom(data?.room[0]?.private_bathroom);
              setoutdoor_and_view(data?.room[0]?.outdoor_and_view);
              setfood(data?.room[0]?.food);
              setbathroom_items(data?.room[0]?.bathroom_items);
              setamenities(data?.room[0]?.amenities);
              setprice(data?.room[0]?.price);
              setwidth(data?.room[0]?.width);
              setno_of_guests(data?.room[0]?.no_of_guests);
              setsmoking(data?.room[0]?.smoking);
              setdescription(data?.room[0]?.description);
          }
          useEffect(()=>{
            fetchRoom();
          },[])

      const handleUpdateRoom = async() =>{
        
        const loadData = {_id,property_id,type,name,no_of_rooms,width,no_of_guests,smoking,outdoor_and_view,food,
            private_bathroom,bathroom_items,amenities,description,price,twin,full,queen,king};
        console.log(loadData);
        try {
            const response = await fetch("/api/room/update", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(loadData),
            });
        
            const result = await response.json();
            // console.log(result);
            router.push(`/property_list/room/create/${_id}/room_image`);

          } catch (error) {
            console.error("Error:", error);
          }
    }
  return (
    <div className='w-full '>
        <div className="text-3xl mt-3 text-center">Fill Room's Detail Information</div>
        <div className='flex flex-wrap w-full'>
            <div className="left p-5 w-1/2">
                <div className="shadow-sm border p-3 rounded-md border-gray-300">
                    <label>What is the type of room?</label>
                    <Select onValueChange={(value)=>settype(value)} value={type}>
                    <SelectTrigger className="w-full border border-primary">
                        <SelectValue placeholder="Room type" />
                    </SelectTrigger>
                    <SelectContent>
                                {
                                    roomTypes.map((item,index)=>(
                                        <SelectItem value={item} key={index}>{item}</SelectItem>
                                    ))
                                }
                    </SelectContent>
                    </Select>

                    <div  className='mt-5'>
                        <label htmlFor="">Name of this room</label>
                        <Select onValueChange={(value)=>setname(value)} value={name}>
                            <SelectTrigger className="w-full border border-primary">
                                <SelectValue placeholder="Room type" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    roomNames.map((item,index)=>(
                                        <SelectItem value={item} key={index}>{item}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                            </Select>
                    </div>

                        <div  className='mt-5'>
                        <label htmlFor="">How many rooms of this type do you have?</label>
                        <Input type="number" value={no_of_rooms} onChange={(e)=>setno_of_rooms(e.target.value)} placeholder="Number of rooms" className="border border-primary" />
                        </div>

                        <div className='mt-5'>
                            <label htmlFor="" className='mt-3'>How big is this room ? (square feet) </label>
                            <Input type="number" value={width} onChange={(e)=>setwidth(e.target.value)} placeholder="" className="border border-primary" />
                        </div>                  
                </div>

                <div className="shadow-sm border p-3 mt-5 rounded-md border-gray-300">
                    <label>What beds are available in this room?</label>
                    <div>
                       
                                <div className='flex justify-between my-3' >
                                <div className='w-2/3'>
                                <BedSingle className='inline me-3'/>Twin bed  
                                    <div className='text-sm ms-9 text-gray-500' >31-50 wide</div>  
                                </div> 
                                <div className='flex w-1/3'>
                                    <Button onClick={()=>twin!=0 && settwin(twin-1)}>-</Button>
                                    <div className='w-full text-center'>{twin}</div>
                                    <Button onClick={()=>settwin(twin+1)}>+</Button>
                                </div>
                                </div>

                                <div className='flex justify-between my-3'>
                                <div className='w-2/3'>
                                <BedDouble className='inline me-3'/>Full bed  
                                    <div className='text-sm ms-9 text-gray-500' >50-59 wide</div>  
                                </div> 
                                <div className='flex w-1/3'>
                                    <Button onClick={()=>full!=0 && setfull(full-1)}>-</Button>
                                    <div className='w-full text-center'>{full}</div>
                                    <Button onClick={()=>setfull(full+1)}>+</Button>
                                </div>
                                </div>

                                <div className='flex justify-between my-3' >
                                <div className='w-2/3'>
                                <BedDouble className='inline me-3'/>Queen bed  
                                    <div className='text-sm ms-9 text-gray-500' >60-70 wide</div>  
                                </div> 
                                <div className='flex w-1/3'>
                                    <Button onClick={()=>queen!=0 && setqueen(queen-1)}>-</Button>
                                    <div className='w-full text-center'>{queen}</div>
                                    <Button onClick={()=>setqueen(queen+1)}>+</Button>
                                </div>
                                </div>

                                <div className='flex justify-between my-3' >
                                <div className='w-2/3'>
                                <BedDouble className='inline me-3'/>King bed  
                                    <div className='text-sm ms-9 text-gray-500'>71-80 wide</div>  
                                </div> 
                                <div className='flex w-1/3'>
                                    <Button onClick={()=>king!=0 && setking(king-1)}>-</Button>
                                    <div className='w-full text-center'>{king}</div>
                                    <Button onClick={()=>setking(king+1)}>+</Button>
                                </div>
                                </div>
                        
                        

                        

                    </div>

                    <div className="mt-5">
                        <label htmlFor="">How many guests can stay in this room?</label>
                        <Input type="number" value={no_of_guests} onChange={(e)=>setno_of_guests(e.target.value)} placeholder="Number of rooms" className="border border-primary" />
                    </div>
                    <div className="mt-5">
                        <label htmlFor="">Is smoking allowed in this room?</label>
                        <div className="text-sm mt-3">
                            <input type="radio"  name="smoking"   onChange={()=>setsmoking(true)} checked={smoking == true}  />Yes
                        </div>
                        <div className="text-sm">
                            <input type="radio" name="smoking"  onChange={()=>setsmoking(false)} checked={smoking == false}/>No
                        </div>
                    </div>

                </div>
                
                {/* Outdoor and view */}
                <div className="shadow-sm p-5 border border-gray-300 rounded-md mt-5">
                <div className="text-xl font-bold ">Outdoor and View</div>
            {
                outdoors.map((item,index)=>{
                const checked = outdoor_and_view.includes(item);
                   return (
                    <div className="flex items-center space-x-2 my-2 " key={index}>
                    <Checkbox id={item} onClick={()=>selectOutdoorAndView(item)} checked={checked}/>

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

            {/* Select View */}
            <Select onValueChange={(value)=>setoutdoor_and_view((prev)=>[...prev,value])}>
                    <SelectTrigger className="w-full border border-primary">
                        <SelectValue placeholder="Select View" />
                    </SelectTrigger>
                    <SelectContent>
                        
                        {
                            views.map((view,index)=>(
                                <SelectItem key={index} value={view}>{view}</SelectItem>
                            ))
                        }
                       
                    </SelectContent>
            </Select>
            </div>
            
            {/* food and drink */}
            <div className="shadow-sm p-5 border border-gray-300 rounded-md mt-5">
                <div className="text-xl font-bold ">Food and Drinks</div>
            {
                foodAndDrinks.map((item,index)=>{
                const checked = food.includes(item);
                   return (
                    <div className="flex items-center space-x-2 my-2 " key={index}>
                    <Checkbox id={item} onClick={()=>selectFood(item)} checked={checked}/>

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

            {/* end of food and drinks */}
            </div>

            {/* end of outdoor and view */}
            </div>
            <div className="right p-5 w-1/2">
            <div className="shadow-sm p-5 border border-gray-300 rounded-md">
                <div className="text-xl font-bold">
                Is bathroom private?</div>
                <div className="text-sm mt-3">
                    <input type="radio"  name="privateBathroom" onChange={()=>setPrivateBathroom(true)} checked={private_bathroom == true}   />Yes
                </div>
                <div className="text-sm">
                    <input type="radio" name="privateBathroom" onChange={()=>setPrivateBathroom(false)} checked={private_bathroom == false} />No
                </div>

                <div className="text-xl font-bold mt-5">Which bathrooms items are available?</div>
            {
                bathroomItems.map((item,index)=>{
                const checked = bathroom_items.includes(item);
                   return (
                    <div className="flex items-center space-x-2 my-2 " key={index}>
                    <Checkbox id={item} onClick={()=>selectBathroomItems(item)} checked={checked}/>
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

            </div>

            {/*  */}
            <div className="shadow-sm p-5 border border-gray-300 rounded-md mt-5">
                <div className="text-xl font-bold mt-5">General amenities</div>
            {
                roomAmenities.map((item,index)=>{
                const checked = amenities.includes(item);
                   return (
                    <div className="flex items-center space-x-2 my-2 " key={index}>
                    <Checkbox id={item} onClick={()=>selectAmenities(item)} checked={checked}/>
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

            </div>

            {/* Price per room */}
            <div className="shadow-sm p-5 border border-gray-300 rounded-md mt-5">
                <div className="text-xl font-bold ">Price per night</div>
                <div className='flex items-center'><Input type="number" value={price} onChange={(e)=>setprice(e.target.value)} className="border border-primary"/><div className='text-bold text-3xl p-2'>$</div> </div>
                <div>
                    Include taxes, commission(15%) and fee
                </div>

            </div>
            {/* end of price per room */}

                </div>
            </div>
            <Button onClick={handleUpdateRoom} className="w-full mb-3">Update and Continue</Button>
            {/* <Link className="w-full my-3 p-3" href={`/property_list/room/create/${property_id}/room_image`}>Continue</Link> */}
    </div>
  )
}

export default page