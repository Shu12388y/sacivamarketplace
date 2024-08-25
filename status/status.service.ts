import {getSystemStatus} from "./status";
import { Router } from "express";
import {type Response,type Request} from "express";



export const SystemStatusRouter = Router()


SystemStatusRouter.get("/status",(_:Request,res:Response)=>{
    try {
        const data = getSystemStatus()
        return res.json({"message":"success","data":data}).status(200)
    } catch (error) {
        return res.json({"message":error}).status(500)
    }
})