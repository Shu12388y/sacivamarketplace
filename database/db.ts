import mongoose from "mongoose";


export const connectDB = async()=>{
    try {
        const connect = await mongoose.connect(process.env.DATABASE as string);
        if(connect){
            console.log("database connect")
        } 
    } catch (error) {
        console.log(error)
    }
}