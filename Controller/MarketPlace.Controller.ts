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

    static async updatePost(req:Request,res:Response){
            try {
                const params = await req.params;
                const {Name,price,negotiable,category,subCategory,pickupLocation,productImages} =  await req.body;
                const updatedItem = await Market.findByIdAndUpdate(params.id,{
                    Name,price,negotiable,category,subCategory,pickupLocation,productImages
                })
                if(!updatedItem){
                    return res.json({message:"server error"}).status(500)
                }

            } catch (error) {
                return res.json({"message":error}).status(500)
            }
    }

    static async deletePost(req:Request,res:Response){
        try {
            const params = req.params;
            await Market.findByIdAndDelete({_id:params.id})
            return res.json({message:"Post delete"}).status(200)

        } catch (error) {
            return res.json({message:error}).status(500)
        }
    }

    static async getAllPost(req:Request,res:Response){
        try {
            const {cluster} = await req.body;
            const data = await Market.find({cluster:cluster})
            if(!data){
                return res.json({message:"No items"}).status(404)
            }
            return res.json({message:"sucess",data:data}).status(200)
            
            
        } catch (error) {
            return res.json({"message":error}).status(500)
        }
    }


    static async getOnePost(req:Request,res:Response){
        try {
            const {query} = req.query;
            const data = await Market.find({
                Name:{$regex:query,$option:'i'}
            });
            if(!data){
                return res.json({"message":"No item"}).status(404)
            }
            return res.json({"message":"success",data:data}).status(200)
        } catch (error) {
            return res.json({"message":error}).status(500)
        }

    }


}