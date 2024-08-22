import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { MarketRouter } from "./Routes/MarketPlace.Router";

export const app = express();



// middleware 
app.use(helmet());
app.use(cors({origin:['http://localhost:3000']}));
app.use(cookieParser());
app.use(express.urlencoded({extended:true,limit:'30mb'}));
app.use(express.json({limit:"30mb"}))




// Routes
app.use(MarketRouter);
