import { connectToDB } from "@/lib/db";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
// export const GET = async () =>{
//     return NextResponse.json({'helo':'ehlo'});
// }

export const POST = async(request)=>{
    const {name,email,password} = await request.json();
    await connectToDB();

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return NextResponse.json(
            { message: "Email is already registered! Please sign in." },
            { status: 400 }
        );
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password,5);
    await UserModel.create({name,email,"password":hashedPassword,"role":"user"});
    return NextResponse.json(
        { message: "Success" },
        { status: 201 }
    );
}