import { Market } from "../Models/MarketPlace.Model";
import { type Request,type Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export class MarketController{
    static async createPost(req:Request,res:Response){
        try {
            // get user cookie
            const userCookie = await req.cookies;
            
            if(!userCookie){
                return res.json({message:"please login"}).status(404)
            }

            // get the user token
            const userId:JwtPayload = jwt.verify(userCookie?.token,process.env.SECERT!) as JwtPayload;
           
            // get user input from the body
            const {Name,price,negotiable,category,subCategory,pickupLocation,productImages} =  await req.body;
            if(!Name && !price && !negotiable && !category && !subCategory  && !pickupLocation && !productImages){
                return res.json({message:"Every field is required"}).status(404)
            }


            const productModel = await new Market({
                email:userId?.data,
                Name,
                price,
                negotiable,
                category,
                subCategory,
                pickupLocation,
                productImages

            })

            await productModel.save()
            return res.json({message:"created"}).status(200)

        } catch (error) {
            return res.json({message:error}).status(500)
            
        }

    }



}