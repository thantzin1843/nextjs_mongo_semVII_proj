
"use client";
import {Delete, ImagePlusIcon } from 'lucide-react'
import React, { useEffect, useState } from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { Button } from '@/components/ui/button';

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export default function Home() {
  const [img, setImg] = useState([]);
  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/upload-auth");
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };
  
  useEffect(()=>{

  })
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
        body: JSON.stringify(img),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Images saved to DB:", data.message);
      } else {
        console.error("Error saving images to DB:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  }

  const deleteImage = async(fileId)=>{
    console.log(fileId);
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
    <div className="App">
      
      <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>

         <div className='p-3 bg-red-500'>
         
             <IKUpload fileName="test-upload.png" multiple onError={onError} onSuccess={onSuccess} className='invisible' id="images"/>
             <label htmlFor="images">
                 <div className='border border-primary w-[120px] h-[120px] bg-primary shadow-xl p-5 rounded-lg'>
                     <ImagePlusIcon className='w-full h-full text-white'/>
                     <div className="text-xs text-white text-center">Upload here!</div>
                 </div>
             </label>
          <Button className="mt-3" onClick={()=>saveImageToDB()}>Upload images</Button>
         </div>

      </ImageKitProvider>
      {/* ...other SDK components added previously */}
      <div className='flex gap-5 flex-wrap'>
      {
        img?.map((image, index) => (
          <div key={index} className='relative'>
            <IKImage urlEndpoint={urlEndpoint} path={image.name} width={200} height={200} alt="Alt text" />
            <Button className="absolute top-0 right-0 bg-red-500 m-1" onClick={()=>deleteImage(image.fileId)}><Delete /></Button>
          </div>
        ))
      }
      {/* <IKImage urlEndpoint={urlEndpoint} path={img.name} width={200} height={200} alt="Alt text" /> */}
      </div>
    </div>
  );
}

// imagekit

