import { connectToDB } from "@/lib/db";
import HotelReviewModel from "@/models/HotelReviewModel";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
      await connectToDB(); // Ensure DB connection
  
      const { searchParams } = new URL(req.url);
      const property_id = searchParams.get('property_id');
  
      if (!property_id) {
        return NextResponse.json(
          { error: 'Property ID is required' },
          { status: 400 }
        );
      }
  
      // Fetch reviews and populate the userId field with user details
      const reviews = await HotelReviewModel.find({ property_id })
        .populate('userId') // Populate user details
        .exec();
  
      return NextResponse.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json(
        { error: 'Internal Server Error', details: error.message },
        { status: 500 }
      );
    }
  }


export async function POST(req) {
  try {
    await connectToDB() // Ensure DB connection

    const loadData = await req.json(); // Get form data from request body
    console.log(loadData);
    await HotelReviewModel.create(loadData)

    return NextResponse.json({ success: true, message: "Review is saved successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error reviewing property", error: error.message }, { status: 500 });
  }
}

