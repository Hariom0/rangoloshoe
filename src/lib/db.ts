import mongoose from "mongoose";
const MONGODB_URI : string = process.env.MONGODB_URI || ""

export default async function dbconnect() {
    if(!MONGODB_URI){
        throw new Error("No DB URI Found")
    }
    await mongoose.connect(MONGODB_URI)
    return mongoose;
}