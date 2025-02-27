import { connectToDB } from "@/lib/db";
import PropertyModel from "@/models/PropertyModel";
import RoomImageModel from "@/models/RoomImageModel";
import RoomModel from "@/models/RoomModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB() // Ensure DB connection

    const formData = await req.json(); // Get form data from request body
    console.log(formData);
    // Create a new hotel document
    const result = await RoomModel.create(formData);

    const roomId = result._id;
    console.log("saved room id is "+roomId);
    
    return NextResponse.json({ success: true, message: "Room created successfully!",roomId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error saving hotel", error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const property_id = searchParams.get("property_id");
  try {
    await connectToDB();

  const roomsWithImages = await RoomModel.aggregate([
    // Stage 1: Match rooms with the given property_id
    {
        $match: { property_id: new mongoose.Types.ObjectId(property_id) }
    },
    // Stage 2: Join room_images collection using $lookup
    {
        $lookup: {
            from: "roomimages", // The collection to join with (room_images)
            localField: "_id", // The field from the rooms collection (_id)
            foreignField: "roomId", // The field from the room_images collection (roomId)
            as: "images" // The name of the new array field to store the joined documents
        }
    }])
    console.log(roomsWithImages);
    return NextResponse.json(roomsWithImages);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToDB();

  const room = await RoomModel.findById(id);
  const property = await PropertyModel.findById(room.property_id);
  property.rooms = property.rooms.filter(roomId => roomId.toString() !== id.toString());
  await property.save();

  await RoomModel.findByIdAndDelete(id);
  await RoomImageModel.deleteMany({
      roomId: id, // Assuming property_id is stored as a string in the room collection
  });

  
  return NextResponse.json({ message: "Property deleted" }, { status: 200 });
}