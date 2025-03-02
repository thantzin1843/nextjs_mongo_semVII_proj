
"use client";
import {Delete, ImagePlusIcon } from 'lucide-react'
import React, { useEffect, useState } from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Home() {
  const params = useParams();
  const property_id = params.property_id;
  const [img, setImg] = useState([]);
  const [uploaded,setUploaded] = useState(false);
  const {toast} = useToast();
  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/upload-auth");
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
  
      
      const data = await response.json();
      const { signature, expire, token } = data;
      console.log(expire)
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  
  const openToast = (message) =>{
    toast({
      title: message,
      description: new Date().toLocaleTimeString(),
      bg:'bg-green-500 text-white'
      
    })
  }

  const fetchAllImages = async(pid)=>{
    try{
      const res = await fetch('/api/property/images?property_id='+pid);
      const data = await res.json();
      setImg(data[0]?.images || []);
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    fetchAllImages(property_id);
  },[])

  const onError = (err) => {
    console.log("Error", err);
  };
  
  
  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev)=>{
      return [...prev, {"fileId":res.fileId , "name":res.name}]
    });
  };

  // save to DB
  const saveImageToDB = async()=>{
    try {
      const response = await fetch("/api/property/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({img,property_id}),
      });
      setUploaded(true);
      openToast("Image uploaded successfully!");
      window.history.go(-1);
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  const deleteImage = async(fileId)=>{
    // console.log(fileId);
    try {
      const response = await fetch("/api/property/images", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Image deleted:", data.message);
        setImg((prev)=>{
          return prev.filter((img) => img.fileId!==fileId)
        });
      } else {
        console.error("Error deleting image:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  return (
    <div className='App'>
       {/* {
          uploaded ? <div className="mt-5 text-lg text-green-500">Images uploaded successfully!</div> : <div className='text-red-500 mt-5 text-lg'>Images are not uploaded yet!</div>
        } */}
      <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>

         <div className='p-3 '>
         
             <IKUpload fileName="test-upload.png" multiple onError={onError} onSuccess={onSuccess} className='invisible' id="images"/>
             <label htmlFor="images">
                 <div className='border border-primary w-[120px] h-[120px] bg-primary shadow-xl p-5 rounded-lg'>
                     <ImagePlusIcon className='w-full h-full text-white'/>
                     <div className="text-xs text-white text-center">Select Image</div>
                 </div>
             </label>
          <Button className="mt-3" onClick={()=>saveImageToDB()}>Upload images</Button>
         </div>

      </ImageKitProvider>

      {

      }
      <div className='flex gap-5 flex-wrap'>
      {
        img?.map((image, index) => (
          <div key={index} className='relative'>
            <IKImage urlEndpoint={urlEndpoint} path={image.name} width={200} height={200} alt="Alt text" />
            <Button className="absolute top-0 right-0 bg-red-500 m-1" onClick={()=>deleteImage(image.fileId)}><Delete /></Button>
          </div>
        ))
      }

      </div>
    </div>
  );
}

// imagekit

