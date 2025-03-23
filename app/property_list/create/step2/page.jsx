'use client'
import Indicator from "@/components/Property/Indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormContext } from "@/context/PropertyListContext";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Step2 = () => {
  const { formData, updateFormData } = useFormContext();
  const [address, setAddress] = useState(formData.address || "");
  const [apartment, setApartment] = useState(formData.apartment || "");
  const [country, setCountry] = useState(formData.country || "");
  const [city, setCity] = useState(formData.city || "");
  const [zipcode, setZipcode] = useState(formData.zipcode || "");
  const [mapLink, setMapLink] = useState(formData.mapLink || "Map not set yet!");

  const [propertyName, setPropertyName] = useState(formData.propertyName || "");
  const [starRating, setStarRating] = useState(formData.starRating || "");
  const router = useRouter();

  const nextStep = () => {
    updateFormData({ address, apartment, country, city, zipcode,mapLink,propertyName,starRating });
    router.push("/property_list/create/step3");
  };

  const prevStep = () => {
    updateFormData({ address, apartment, country, city, zipcode,mapLink,propertyName,starRating });
    router.push("/property_list/create/step1");
  };

  
  return (
    <div >
      <Indicator step={2}/>

    <div className="font-bold text-xl mt-5 ">Where is your property?</div>
    <div className="flex gap-5">
    <div className="w-1/2 col-span-1 shadow-lg border border-primary p-5 rounded-lg">
    <label htmlFor="" className='text-sm'>Address</label>
     <Input type="text" placeholder="Your property's address"  className="mb-5 border border-primary " value={address} onChange={(e)=>setAddress(e.target.value)}/>   
     <label htmlFor="" className='text-sm'>Apartment</label>
     <Input type="text" placeholder="Apartment"  className="mb-5 border border-primary" value={apartment} onChange={(e)=>setApartment(e.target.value)}/> 
     <label htmlFor="" className='text-sm'>Country</label>
     <Input type="text" placeholder="Country"  className="mb-5 border border-primary" value={country} onChange={(e)=>setCountry(e.target.value)}/> 
     <label htmlFor="" className='text-sm'>City</label>
     <Input type="text" placeholder="City"  className="mb-5 border border-primary" value={city} onChange={(e)=>setCity(e.target.value)}/>              
     <label htmlFor="" className='text-sm'>Zipcode</label>
     <Input type="text" placeholder="Zipcode"  className="mb-5 border border-primary" value={zipcode} onChange={(e)=>setZipcode(e.target.value)}/> 
     <label htmlFor="" className='text-sm'>Map</label>
     <Input type="text" placeholder="Map Link"  className="mb-5 border border-primary" value={mapLink} onChange={(e)=>setMapLink(e.target.value)}/> 
    </div>


    <div className="w-1/2 col-span-1">
    <label htmlFor="" className='text-xl font-bold'>Name of your {formData.propertyCategory}</label>
     <Input type="text" placeholder="Name here"  className=" border border-primary" value={propertyName} onChange={(e)=>setPropertyName(e.target.value)}/>                 
    <span className="text-gray-500 text-xs">This name will be seen by guests when they search for a place to stay.
    </span>
    <hr className="my-3"/>
     <label htmlFor="" className='text-xl font-bold'>What is star rating of your hotel?</label>
      <div className="flex gap-3 mt-3 mb-3">
        {
          [1, 2, 3, 4, 5].map((star) => (
            <Star key={star} onClick={()=>setStarRating(star)} className={`h-7 w-7 ${starRating >= star? "text-yellow-500" : "text-gray-300"}`} />
          ))
        }
      
      </div>
      <div>
      {
        mapLink !== "Map not set yet!" && <iframe src={mapLink}></iframe>
      }
      </div>
    </div>

    </div>

      <div className="flex w-full justify-between my-5 gap-5">
      <Button onClick={prevStep} className="w-1/3 border border-primary bg-white hover:bg-white text-black">Back</Button>
      <Button className="w-2/3 text-end" onClick={nextStep}>Next</Button>
      </div>
    </div>
    // <div>
    //   <h1>Step 2: Room Details</h1>
    //   <input
    //     type="text"
    //     placeholder="Room Type"
    //     value={roomType}
    //     onChange={(e) => setRoomType(e.target.value)}
    //   />
    //   <input
    //     type="number"
    //     placeholder="Price per Night"
    //     value={price}
    //     onChange={(e) => setPrice(e.target.value)}
    //   />
    //   <button onClick={prevStep}>Back</button>
    //   <button onClick={nextStep}>Next</button>
    // </div>
  );
};

export default Step2;
