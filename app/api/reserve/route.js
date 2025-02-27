import { connectToDB } from "@/lib/db";
import PropertyModel from "@/models/PropertyModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB() // Ensure DB connection

    const loadData = await req.json(); // Get form data from request body
    console.log(loadData);

    return NextResponse.json({ success: true, message: "Property created successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error saving hotel", error: error.message }, { status: 500 });
  }
}

