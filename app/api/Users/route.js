import User from "@/app/(models)/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const userData = body.formData;

    if (!userData.email || !userData.password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );
    }

    // Check if the user already exists in the database
    let existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already taken." },
        { status: 409 }
      );
    }
    // Hash the password before storing it in the database
    userData.password = await bcrypt.hash(userData.password,  10);
    
    // Create a new user with the provided data and save it to the database
    await User.create(userData);

    return NextResponse.json({message: "Successfully created an account!"}, {status: 201});

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message, error },
      { status: 500 }
    );
  }
};
