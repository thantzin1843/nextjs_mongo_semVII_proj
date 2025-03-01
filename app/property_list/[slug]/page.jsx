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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useFormContext } from '@/context/PropertyListContext';
import { ArrowRight, Building, Images } from "lucide-react";
import ReservationList from "@/components/ReservationList";

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
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    useEffect(()=>{
      fetchData(params.slug);
    },[])

 
    const handleEdit = (p) =>{
      updateFormData({
            _id:p._id,
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

    const deleteProperty = async(pid) =>{
      console.log(pid);
      const confirmed = confirm("Are you sure want to delete this property?");

      if (confirmed) {
        const res = await fetch(`http://localhost:3000/api/property?id=${pid}`, {
          method: "DELETE",
        });
  
        if (res.ok) {
          setProperties((prevProperties) =>
            prevProperties.filter((property) => property._id !== pid)
          );
        }
      }
    }
  return (
    <section className="bg-white dark:bg-gray-900 mt-5">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Create Your Listing and make revenue.</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">It can take as little as 15 minutes to finish your listing – click continue to start where you left off</p>
            <Link href={`/property_list/create/step1`} className="inline-flex text-white items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary ">
                Create New Listing <ArrowRight className="ms-2 inline"/>
                
            </Link>
            
            
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex h-[300px]">
            <img src="https://jaanveertoursandtravels.com/assets/img/product/tour/hotel.jpg" alt="mockup"/>
        </div>                
    </div>

    <div className='text-3xl mt-5 mb-3'>Your Property Listings</div>


            <div className="mt-2 w-full mb-5">
    <Tabs defaultValue="property" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="property">Properties</TabsTrigger>
        <TabsTrigger value="reservation">Reservations</TabsTrigger>
      </TabsList>
      <TabsContent value="property">
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
                        <TableRow key={index}>
                          <TableCell> 
                            <div className="text-xl font-bold py-5">{p.property_name}</div>
                          </TableCell>
                          <TableCell>
                          <Link href={`/property_list/create/property_image/${p._id}`} className="underline"><Images className="inline"/> Property Images</Link>
                          <Link href={`/property_list/room/list/${p._id}`}  className="ms-3 underline"><Building className="inline"/> Manage rooms</Link>
                          </TableCell>
                          <TableCell>
                          <Button className="bg-blue-500 hover:bg-blue-400" onClick={()=>handleEdit(p)}>Edit</Button>
                          <Button className="bg-red-500 hover:bg-red-400 ms-3" onClick={()=>deleteProperty(p._id)}>Delete</Button>
                          </TableCell>
                        </TableRow>
      ))
    }
                        
                      </TableBody>
                    </Table>
      </TabsContent>

      <TabsContent value="reservation">
          <ReservationList userId={params.slug}/>
      </TabsContent>
    </Tabs>

             
              
              

            </div>
</section>
  )
}

export default page