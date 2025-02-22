'use client'
import Indicator from "@/components/Property/Indicator";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { all_facilities, breakfastOptions } from "@/context/data";
import { useFormContext } from "@/context/PropertyListContext";
import { Cross, Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function page(){
     const { formData, updateFormData } = useFormContext();
     const [facilities, setFacilities]= useState(formData.facilities || []);
     const [selectedFoods, setSelectedFoods] = useState(formData.selectedFoods || []);
     const [serveBreakfast, setServeBreakfast] = useState(formData.serveBreakfast || false);
     const [freeBreakfast, setFreeBreakfast] = useState(formData.freeBreakfast || false);

     const [checkinFrom, setCheckinFrom] = useState(formData.checkinFrom || "");
     const [checkoutFrom, setCheckoutFrom] = useState(formData.checkoutFrom || "");
     const [checkinUntil, setCheckinUntil] = useState(formData.checkinUntil || "");
     const [checkoutUntil, setCheckoutUntil] = useState(formData.checkoutUntil || "");
     const [petAllowed, setPetAllowed] = useState(formData.petAllowed || false);

     const [children, setChildren] = useState(formData.children || false);
     const [ageRestriction, setageRestriction] = useState(formData.ageRestriction || "");
     const [smoking, setsmoking] = useState(formData.smoking || false);
     const [party, setparty] = useState(formData.party || false);

     const router = useRouter();
    const nextStep = () => {
        updateFormData({ facilities, selectedFoods, serveBreakfast, freeBreakfast , checkinFrom, checkoutFrom, checkinUntil, checkoutUntil, petAllowed, children,smoking,ageRestriction,party});
        router.push("/property_list/create/step4");
      };
    
      const prevStep = () => {
        updateFormData({ facilities, selectedFoods, serveBreakfast, freeBreakfast, checkinFrom, checkoutFrom, checkinUntil, checkoutUntil, petAllowed, children,smoking,ageRestriction,party });
        router.push("/property_list/create/step2");
      };

      const toggleSelection = (name) => {
        setSelectedFoods((prev) =>
          prev.includes(name) ? prev.filter((foodname) => foodname !== name) : [...prev, name]
        );
      };

      const selectFacilities = (item) =>{
        setFacilities((prev)=>
            prev.includes(item) ? prev.filter((facility) => facility !== item) : [...prev, item]
        );
        // console.log(facilities);
      }

    return (
        <div className="">
             <Indicator step={3}/>

            <div className="flex gap-5">
            <div className="bg-white shadow-lg w-1/3 p-5 border border-primary rounded-md">
                <div className="text-xl font-bold ">What can guests use at your hotel?</div>
            {
                all_facilities.map((item,index)=>{
                    const checked = facilities.includes(item);
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
            </div>

            <div className="bg-white shadow-lg w-1/3 p-5 border border-primary rounded-md">
                <div className="text-xl font-bold">
                Breakfast details</div>
                <div className="font-bold">Do you serve Breakfast?</div>
                <div className="text-sm mt-3">
                    <input type="radio"  name="serveBreakfast"   onChange={()=>setServeBreakfast(true)} checked={serveBreakfast==true}/>Yes
                </div>
                <div className="text-sm">
                    <input type="radio" name="serveBreakfast" onChange={()=>setServeBreakfast(false)} checked={serveBreakfast==false}/>No
                </div>

                <div className="mt-5 font-bold">Is breakfast included in the price guests pay?</div>
                <div className="text-sm mt-3">
                    <input type="radio" name="include_breakfast" onChange={()=>setFreeBreakfast(true)} checked={freeBreakfast==true} />Yes, it's included
                </div>
                <div className="text-sm">
                    <input type="radio" name="include_breakfast" onChange={()=>setFreeBreakfast(false)} checked={freeBreakfast==false}/>No, it costs extra
                </div>

                <div className="mt-5 font-bold">What type of breakfast do you offer? </div>
                <div className="flex flex-wrap justify-between">
                    {
                        breakfastOptions.map((item,index)=>{
                            const isSelected = selectedFoods.includes(item);

                            return (
                                <div key={index} onClick={()=>toggleSelection(item)} className={isSelected ? `py-1 px-2 rounded-md border border-primary flex m-1 text-sm bg-blue-500 text-white`: "py-1 px-2 rounded-md border border-primary flex m-1 text-sm"}>{item}  </div>
                            )
                           
})
                    }
                </div>
            </div>

            <div className="bg-white shadow-lg w-1/3 p-5 border border-primary rounded-md">
                <div className="text-xl font-bold ">House Rules</div>
                <div className="mb-5 font-bold">When are your checkin and checkout times?</div>
                <div>Check-in</div>
                <div className="flex gap-5">
                    <div>
                        <div className="text-xs">From</div>
                        <Input type="time"  value={checkinFrom} className="border border-primary" onChange={(e)=>setCheckinFrom(e.target.value)}/>
                    </div>
                    <div>
                        <div className="text-xs">Until</div>
                        <Input type="time" value={checkinUntil} className="border border-primary" onChange={(e)=>setCheckinUntil(e.target.value)} />
                    </div>
                </div>

                <div className="mt-5">Check-out</div>
                <div className="flex gap-5 mb-3">
                    <div>
                        <div className="text-xs">From</div>
                        <Input type="time"  value={checkoutFrom} onChange={(e)=>setCheckoutFrom(e.target.value)}  className="border border-primary"/>
                    </div>
                    <div>
                        <div className="text-xs">Until</div>
                        <Input type="time" value={checkoutUntil}  onChange={(e)=>setCheckoutUntil(e.target.value)} className="border border-primary" />
                    </div>
                </div>
                <hr />
                <div className="my-3 font-bold">Do you allowed pets?</div>
                <div className="text-sm mt-3">
                    <input type="radio" name="pet" onChange={()=>setPetAllowed(true)} checked={petAllowed == true}/>Yes
                </div>
                <div className="text-sm">
                    <input type="radio" name="pet" onChange={()=>setPetAllowed(false)} checked={petAllowed == false}/>No
                </div>

                
                <div className="my-3 font-bold">Do you allowed children?</div>
                <div className="text-sm mt-3">
                    <input type="radio" name="children" onChange={()=>setChildren(true)} checked={children==true} />Yes
                </div>
                <div className="text-sm">
                    <input type="radio" name="children" onChange={()=>setChildren(false)} checked={children==false} />No
                </div>

                <div className="my-3 font-bold">Do you allowed party?</div>
                <div className="text-sm mt-3">
                    <input type="radio" name="party" onChange={()=>setparty(true)} checked={party==true} />Yes
                </div>
                <div className="text-sm">
                    <input type="radio" name="party" onChange={()=>setparty(false)} checked={party==false} />No
                </div>

                <div className="my-3 font-bold">Do you allowed smoking?</div>
                <div className="text-sm mt-3">
                    <input type="radio" name="smoking" onChange={()=>setsmoking(true)} checked={smoking==true} />Yes
                </div>
                <div className="text-sm">
                    <input type="radio" name="smoking" onChange={()=>setsmoking(false)} checked={smoking==false} />No
                </div>

                <div className="my-3 font-bold">Age Restriction</div>
                <Input type="text" value={ageRestriction} onChange={(e)=>setageRestriction(e.target.value)}/>
            </div>
            
            </div>
            <div className="flex w-full justify-between my-5 gap-5">
                  <Button onClick={prevStep} className="w-1/3 border border-primary bg-white hover:bg-white text-black">Back</Button>
                  <Button className="w-2/3 text-end" onClick={nextStep}>Next</Button>
            </div>
        </div>

    )
}