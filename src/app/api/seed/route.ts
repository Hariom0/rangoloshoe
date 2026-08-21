import seedData from "@/lib/seed";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
	await seedData()
	return NextResponse.json({ Msg: "Hello" });
}
