'use client'

import Indicator from "@/components/Property/Indicator";
import { Button } from "@/components/ui/button";
import { useFormContext } from "@/context/PropertyListContext";
import { CircleCheckBig } from "lucide-react";
import next from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";


const Step1 = () => {
  const { formData, updateFormData } = useFormContext();
  // console.log(formData.propertyCategory)
  const [propertyCategory, setPropertyCategory] = useState(formData.propertyCategory || "");
  // const [location, setLocation] = useState(formData.location || "");
  const router = useRouter();

  const nextStep = () => {
    updateFormData({ propertyCategory});
    router.push("/property_list/create/step2");
  };
  const prevStep = () => {
    updateFormData({ propertyCategory});
    router.push("/property_list");
  };

  const propertyCategories = [
    { name: "hotel", description: "Accommodation for travelers often offering restaurants, meeting rooms, and other guest services." },
    { name: "guest_house", description: "A private house offering lodging and sometimes meals to paying guests." },
    { name: "bed_and_breakfast", description: "A small lodging establishment offering overnight stays and breakfast in a cozy setting." },
    { name: "homestay", description: "A stay in a private home, where guests can experience local culture and hospitality." },
    { name: "hostel", description: "Budget-friendly shared accommodation with dormitory-style rooms, ideal for backpackers." },
    { name: "aparthotel", description: "A blend of hotel and apartment, offering self-catering facilities and hotel-like services." },
    { name: "capsule_hotel", description: "Compact, pod-style accommodations, often found in urban areas for short stays." },
    { name: "country_hotel", description: "A hotel located in a rural setting, offering a peaceful retreat with scenic surroundings." },
    { name: "farm_stay", description: "Accommodation on a working farm, allowing guests to engage in farming activities and enjoy nature." }
  ];

  return (
    <div >
<Indicator step={1}/>

      <div className="font-bold text-xl my-5 ">From the list below, which property category is most similar to your place?</div>
      <div className="flex flex-wrap gap-5">
      {propertyCategories.map(({ name, description }) => (
      <div
      key={name}
      className={
          propertyCategory === name
            ? `border-2 shadow-sm w-1/5 p-3 border-primary rounded-md relative`
            : `border shadow-sm w-1/5 p-3 rounded-md`
        }
        onClick={() => setPropertyCategory(name)}
        >
        {propertyCategory == name && <CircleCheckBig className="absolute text-primary bg-white rounded-full text-md" style={{top:"-10px",right:0}}/>}
        <div className="text-sm font-bold mb-3">
          {name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </div>
        <div className="text-xs">{description}</div>
      </div>
    ))}

        
      </div>
      <div className="flex w-full justify-between my-5 gap-5">
      <Button onClick={prevStep} className="w-1/3 border border-primary bg-white hover:bg-white text-black">Back</Button>
      <Button className="w-2/3 text-end" onClick={nextStep}>Next</Button>
      </div>
      

    
    </div>
  );
};

export default Step1;
