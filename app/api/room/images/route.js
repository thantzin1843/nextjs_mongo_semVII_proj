import { connectToDB } from "@/lib/db";
import RoomImageModel from "@/models/RoomImageModel";
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
    const updatedRoom = await RoomImageModel.findOneAndUpdate(
      { "images.fileId": fileId }, // Find property with the given fileId
      { $pull: { images: { fileId } } }, // Remove the specific image from images array
      { new: true } // Return the updated document
    );
    if (!updatedRoom) {
      return NextResponse.json({ message: "Image not found in database" }, { status: 200 });
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST (request){
    try {
        await connectToDB();
        const {img, roomId} = await request.json();
         // Find the existing property by `roomId`
        const existingProperty = await RoomImageModel.findOne({ roomId });
        if (existingProperty) {
          // If property exists, update images array
          await RoomImageModel.updateOne(
            { roomId },
            { $set: { images: img } } // Append new images to the array
          );
          return NextResponse.json({ message: "Images updated successfully" });
        } else {
          // If property doesn't exist, create a new document
          await RoomImageModel.create({ roomId, images: img });
          return NextResponse.json({ message: "Property images saved successfully" });
        }
    } catch (error) {
        return NextResponse.json({message:"error"})
    }
}

export async function GET (req) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  try {
    await connectToDB();
    const images = await RoomImageModel.find({roomId});
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}