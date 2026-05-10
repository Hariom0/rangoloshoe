import dbconnect from "@/lib/db";
import Footware from "@/models/Footware";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    await dbconnect();
    try {
        let data = await Footware.find()
        return NextResponse.json({data})
    } catch (error) {
        NextResponse.json({"msg":"Failed to fetch data"})
        throw new Error("Failed to fetch data")
    }
}