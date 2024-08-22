import mongoose, { models } from "mongoose";



const MarketPlaceSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    negotiable:{
        type:Boolean,
        required:true
    },
    category:{
        type:String
    },
    subCategory:{
        type:String
    },
    pickupLocation:{
        type:String
    },
    productImages:{
        type:String,
        required:true
    }

},{timestamps:true});


export const Market = models.Market || mongoose.model('Market',MarketPlaceSchema);