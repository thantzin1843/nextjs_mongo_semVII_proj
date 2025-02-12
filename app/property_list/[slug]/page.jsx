"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useFormContext } from '@/context/PropertyListContext';

function page() {
    const params = useParams();
    const [properties, setProperties] = useState([]);
    const {formData, updateFormData} = useFormContext();
    const router = useRouter();
    useEffect(()=>{
      localStorage.setItem('userId',params.slug)
    },[])

    const fetchData = async (userId) => {
      try {
        const response = await fetch(`/api/property?userId=${userId}`);
        const data = await response.json();
        // console.log(data);
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    useEffect(()=>{
      // console.log(params.slug)
      fetchData(params.slug);
    },[])

 
    const handleEdit = (p) =>{
      console.log(p)
      updateFormData({
            propertyName:p.property_name,
            propertyCategory:p.property_category,
            address: p.location.address,
            city: p.location.city,
            country: p.location.country,
            apartment: p.location.apartment,
            zipcode: p.location.zipcode,
            mapLink: p.location.mapLink,
            checkinFrom:p.checkin.from,
            checkinUntil:p.checkin.until,
            checkoutFrom:p.checkout.from,
             checkoutUntil:p.checkout.until,
            ageRestriction:p.house_rules.age_restriction,
            children:p.house_rules.children_allowed,
            petAllowed:p.house_rules.pet_allowed,
            smoking:p.house_rules.smoking_allowed,
            party:p.house_rules.party_allowed,
            starRating:p.star_rating,
            serveBreakfast: p.food_and_dining.serve_breakfast,
            freeBreakfast:p.food_and_dining.free_breakfast,
            selectedFoods:p.food_and_dining.selected_foods,
            facilities: p.facilities,
            selectedFunThings:p.fun_things_todo,
            accessibility:p.property_accessibility,
   
            privateBathroom:p.bathroom_info.private,
            selectedBathroomItems:p.bathroom_info.items,
  
            payments:p.payments,
      
            distance:p.from_city.distance,
            unit:p.from_city.unit,

            isEdit:true
        

      });
      router.push('/property_list/create/step1')
    }
  return (
    <section className="bg-white dark:bg-gray-900 mt-5">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Create Your Listing and make revenue.</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">It can take as little as 15 minutes to finish your listing – click continue to start where you left off</p>
            <Link href={`/property_list/create/step1`} className="inline-flex text-white items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary ">
                Create New Listing 
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
            
            
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex h-[300px]">
            <img src="https://jaanveertoursandtravels.com/assets/img/product/tour/hotel.jpg" alt="mockup"/>
        </div>                
    </div>

    <div className='text-3xl mt-5 mb-3'>Your Previous Property Listings</div>
            <div className="mt-2 w-full mb-5">

               <Table className="mb-5">
                      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                      <TableHeader>
                        <TableRow>
                          <TableHead className=""></TableHead>
                          <TableHead></TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
    {
      properties?.map((p,index)=>(
        // <div key={index} className="border border-primary mt-2 p-5 flex items-center rounded-sm shadow-md justify-between">
        //         <div className='text-xl '>
        //           {p.property_name}
        //         </div>
        //         <div>
        //           <Link href={`/property_list/create/property_image/${p._id}`}><Button>Property Images</Button></Link>
        //         </div>
        //         <div>
        //         <Link href="/"><Button>Manage rooms</Button></Link>
        //         </div>
        //         <div className='flex gap-3'>
        //         <Button className="bg-blue-500 hover:bg-blue-400" onClick={()=>handleEdit(p)}>Edit</Button>
        //         <Button className="bg-red-500 hover:bg-red-400">Delete</Button>
        //         </div>
        //       </div>
                        <TableRow key={index}>
                          <TableCell> 
                            <div className="text-xl font-bold py-5">{p.property_name}</div>
                          </TableCell>
                          <TableCell>
                          <Link href={`/property_list/create/property_image/${p._id}`}><Button>Property Images</Button></Link>
                          <Link href={`/property_list/room/list/${p._id}`} className="ms-3"><Button>Manage rooms</Button></Link>
                          </TableCell>
                          <TableCell>
                          <Button className="bg-blue-500 hover:bg-blue-400" onClick={()=>handleEdit(p)}>Edit</Button>
                          <Button className="bg-red-500 hover:bg-red-400 ms-3">Delete</Button>
                          </TableCell>
                        </TableRow>
      ))
    }
                        
                      </TableBody>
                    </Table>
              
              

            </div>
</section>
  )
}

export default page