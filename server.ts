import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { MarketRouter } from "./Routes/MarketPlace.Router";
import { healthRouter } from "./health/health.service";
import { SystemStatusRouter } from "./status/status.service";

export const app = express();



// middleware 
app.use(helmet());
app.use(cors({origin:['http://localhost:3000','https://sacivamvp.vercel.app']}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true,limit:'30mb'}));
app.use(express.json({limit:"30mb"}))




// Routes
app.use("/api/v1",MarketRouter);
app.use("/api/v1",healthRouter);
app.use("/api/v1",SystemStatusRouter);
