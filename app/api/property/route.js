import { connectToDB } from "@/lib/db"
import PropertyModel from "@/models/PropertyModel";
import RoomModel from "@/models/RoomModel";
import { NextResponse } from "next/server";

export const GET = async (req) =>{
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
         connectToDB();
        const properties = await PropertyModel.find({"userId":userId}).lean();
        return NextResponse.json({
            properties,"message":'success fetch'
        })
    }catch(e){
        console.log(e);
        return NextResponse.json({
            "message":'error fetch'
        })
    }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectToDB();
    await PropertyModel.findByIdAndDelete(id);
    await RoomModel.deleteMany({
        property_id: id, // Assuming property_id is stored as a string in the room collection
    });
    return NextResponse.json({ message: "Property deleted" }, { status: 200 });
  }
