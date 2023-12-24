import mongoose from "mongoose";

export async function connectToDb(uri) {
    try {
        await mongoose.connect(uri)
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
    }
}