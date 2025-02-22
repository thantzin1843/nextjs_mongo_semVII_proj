'use client'
import { saveProperty } from "@/app/actions/property";
import { auth } from "@/auth";
import Indicator from "@/components/Property/Indicator";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { allpayments, bathroomItems, funThings, propertyAccessibility } from "@/context/data";
import { useFormContext } from "@/context/PropertyListContext";
import { useToast } from "@/hooks/use-toast";
import { Cross, Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function page(){
    
     const { formData, updateFormData } = useFormContext();
     const [selectedFunThings, setSelectedFunThings]= useState(formData.selectedFunThings || []);
     const [privateBathroom, setprivateBathroom]= useState(formData.privateBathroom || true);
     const [selectedBathroomItems, setselectedBathroomItems]= useState(formData.selectedBathroomItems || []);
     const [accessibility, setAccessibility] = useState(formData.accessibility || [])
     const [payments, setPayments] = useState(formData.payments || []);
     const [distance, setDistance] = useState(formData.distance || 0);
     const [unit, setUnit] = useState(formData.unit || "");
     const {toast} = useToast();
     const router = useRouter();
    const nextStep = () => {
        updateFormData({ selectedFunThings, privateBathroom, selectedBathroomItems,accessibility,payments,distance,unit});
        router.push("/property_list/create/step5");
      };
    
      const prevStep = () => {
        updateFormData({ selectedFunThings, privateBathroom, selectedBathroomItems,accessibility,payments,distance,unit });
        router.push("/property_list/create/step3");
      };

      const selectFacilities = (item) =>{
        setSelectedFunThings((prev)=>
            prev.includes(item) ? prev.filter((funThing) => funThing !== item) : [...prev, item]
        );
      }

      const selectAccessibility = (item) =>{
        setAccessibility((prev)=>
            prev.includes(item) ? prev.filter((accessibility) => accessibility !== item) : [...prev, item]
        );
      }

      const selectBathroomItems = (item) =>{
        setselectedBathroomItems((prev)=>
            prev.includes(item) ? prev.filter((bitem) => bitem !== item) : [...prev, item]
        );
      }

      const selectpayments = (item) =>{
        setPayments((prev)=>
            prev.includes(item) ? prev.filter((payment) => payment !== item) : [...prev, item]
        );
      }
    const openToast = () =>{
      toast({
        title: "Property saved successfully",
        description: "Friday, February 10, 2023 at 5:57 PM",
        bg:'bg-green-500 text-white'
        
      })
    }
      const submitInfo = async () =>{
        formData.selectedFunThings =selectedFunThings;
        formData.privateBathroom =privateBathroom;
        formData.selectedBathroomItems =selectedBathroomItems;
        formData.accessibility =accessibility;
        formData.payments =payments;
        formData.distance =distance;
        formData.unit = unit;

        // const session = await auth();
        
        const loadData = {
            userId:localStorage.getItem("userId"),
            property_name: formData.propertyName,
            property_category: formData.propertyCategory,
            location: {
              address: formData.address,
              city: formData.city,
              country: formData.country,
              apartment: formData.apartment,
              zipcode: formData.zipcode,
              mapLink: formData.mapLink
            },
            checkin: {
              from: formData.checkinFrom,
              until: formData.checkinUntil
            },
            checkout: {
              from: formData.checkoutFrom,
              until: formData.checkoutUntil
            },
            house_rules: {
              age_restriction: formData.ageRestriction,
              children_allowed: formData.children,
              pet_allowed: formData.petAllowed,
              smoking_allowed: formData.smoking,
              party_allowed: formData.party
            },
            star_rating: formData.starRating,
            food_and_dining: {
              serve_breakfast: formData.serveBreakfast,
              free_breakfast: formData.freeBreakfast,
              selected_foods: formData.selectedFoods
            },
            facilities: formData.facilities,
            fun_things_todo: formData.selectedFunThings,
            property_accessibility: formData.accessibility,
            bathroom_info: {
              private: formData.privateBathroom,
              items:formData.selectedBathroomItems
            },
            payments: formData.payments,
            from_city: {
              distance: formData.distance,
              unit: formData.unit
            }
          }
          // console.log(loadData);
          try {
            const response = await fetch("/api/property/save", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(loadData),
            });
        
            const result = await response.json();
            // console.log(result);
            openToast();
          } catch (error) {
            console.error("Error:", error);
          }
      }


    return (
        <div className="">
             <Indicator step={4}/>

            <div className="flex gap-5">
            <div className="bg-white shadow-lg w-1/3 p-5 border border-primary rounded-md">
                <div className="text-xl font-bold ">Fun things to do</div>
                {
                    funThings.map((item,index)=>{
                        const checked = selectedFunThings.includes(item);
                    return (
                        <div className="flex items-center space-x-2 my-2 " key={index}>
                        <Checkbox id={item} onClick={()=>selectFacilities(item)} checked={checked}/>
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

                <div className="text-xl font-bold mt-5">Property accessibility</div>
                {
                    propertyAccessibility.map((item,index)=>{
                        const checked = accessibility.includes(item);
                    return (
                        <div className="flex items-center space-x-2 my-2 " key={index}>
                        <Checkbox id={item} onClick={()=>selectAccessibility(item)} checked={checked}/>
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

            <div className="bg-white shadow-lg w-1/3 p-5 border border-primary rounded-md">
                <div className="text-xl font-bold">
                Is bathroom private?</div>
                <div className="text-sm mt-3">
                    <input type="radio"  name="privateBathroom"   onChange={()=>setprivateBathroom(true)} checked={privateBathroom==true}/>Yes
                </div>
                <div className="text-sm">
                    <input type="radio" name="privateBathroom" onChange={()=>setprivateBathroom(false)} checked={privateBathroom==false}/>No
                </div>

                <div className="text-xl font-bold mt-5">Which bathrooms items are available?</div>
            {
                bathroomItems.map((item,index)=>{
                const checked = selectedBathroomItems.includes(item);
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

            <div className="bg-white shadow-lg w-1/3 p-5 border border-primary rounded-md">
               
                <div className="text-xl font-bold ">Payments </div>
            {
                allpayments.map((item,index)=>{
                    const checked = payments.includes(item);
                   return (
                    <div className="flex items-center space-x-2 my-2 " key={index}>
                    <Checkbox id={item} onClick={()=>selectpayments(item)} checked={checked}/>
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

            <div className="text-xl font-bold mt-5">How far from the center of City? </div>
            <div className="flex">
            <Input type="number" value={distance} placeholder="Distance in miles" onChange={(e)=>setDistance(e.target.value)}/>
            <select onChange={(e)=>setUnit(e.target.value)} value={unit}>
                <option value="km" >km</option>
                <option value="mile" >mile</option>
            </select>
            </div>

            </div>

            </div>
            <div className="flex w-full justify-between my-5 gap-5">
                  <Button onClick={prevStep} className="w-1/3 border border-primary bg-white hover:bg-white text-black">Back</Button>
                  {
                    formData.isEdit ? (
                      <Button className="w-2/3 text-end" onClick={submitInfo}>Update</Button>
                    ):(
                      <Button className="w-2/3 text-end" onClick={submitInfo}>Save Property</Button>
                    )
                  }
                  
            </div>
        </div>

    )
}