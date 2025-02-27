import { connectToDB } from "@/lib/db";
import PropertyImageModel from "@/models/PropertyImageModel";
import PropertyModel from "@/models/PropertyModel";
import RoomImageModel from "@/models/RoomImageModel";
import RoomModel from "@/models/RoomModel";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const property_id = searchParams.get("property_id");
    console.log(property_id)
    try {
      await connectToDB();
    
      const property = await PropertyModel.find({ _id: property_id })
      const images = await PropertyImageModel.find({ property_id: property_id })

      const rooms = await RoomModel.find({ property_id: property_id })
      const roomIds = rooms.map(room => room._id);

    // Step 3: Query the RoomImageModel for images based on room_ids
    const roomImages = await RoomImageModel.find({ roomId: { $in: roomIds } });

    // Step 4: Merge rooms with the corresponding images
    const mergedRooms = rooms.map(room => {
      // Find the images for the current room
      const images = roomImages.filter(image => image.roomId.toString() === room._id.toString());

      // Add the images to the room object
      return { ...room.toObject(), images: images.map(image => image.images) };
    });

      // console.log(mergedRooms)
        return NextResponse.json({property,images,rooms:mergedRooms});
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  }