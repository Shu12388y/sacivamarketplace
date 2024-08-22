import { Router } from "express";
import { MarketController } from "../Controller/MarketPlace.Controller";

export const MarketRouter = Router();



// routes
MarketRouter.post("/create",MarketController.createPost);