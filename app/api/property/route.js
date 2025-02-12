import { connectToDB } from "@/lib/db"
import PropertyModel from "@/models/PropertyModel";
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