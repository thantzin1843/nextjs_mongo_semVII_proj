import { connectToDB } from "@/lib/db";
import PropertyImageModel from "@/models/PropertyImageModel";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { fileId } = await request.json(); // Get fileId from request body
    // console.log(fileId);
  if (!fileId) {
    return NextResponse.json({ error: "File fileId is required" });
  }

  const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY, // Use environment variables
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
  });

  try {
    await imagekit.deleteFile(fileId);

    await connectToDB();

    // Find and update the property document by removing the image
    const updatedProperty = await PropertyImageModel.findOneAndUpdate(
      { "images.fileId": fileId }, // Find property with the given fileId
      { $pull: { images: { fileId } } }, // Remove the specific image from images array
      { new: true } // Return the updated document
    );
    if (!updatedProperty) {
      return NextResponse.json({ error: "Image not found in database" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST (request){
    try {
        await connectToDB();
        const {img, property_id} = await request.json();
         // Find the existing property by `property_id`
        const existingProperty = await PropertyImageModel.findOne({ property_id });
        if (existingProperty) {
          // If property exists, update images array
          await PropertyImageModel.updateOne(
            { property_id },
            { $set: { images: img } } // Append new images to the array
          );
          return NextResponse.json({ message: "Images updated successfully" });
        } else {
          // If property doesn't exist, create a new document
          await PropertyImageModel.create({ property_id, images: img });
          return NextResponse.json({ message: "Property images saved successfully" });
        }
    } catch (error) {
        return NextResponse.json({message:"error"})
    }
}

export async function GET (req) {
  const { searchParams } = new URL(req.url);
  const property_id = searchParams.get("property_id");
  try {
    await connectToDB();
    const images = await PropertyImageModel.find({property_id});
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}