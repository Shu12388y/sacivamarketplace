import { Router } from "express";
import { MarketController } from "../Controller/MarketPlace.Controller";

export const MarketRouter = Router();



// routes
MarketRouter.post("/create",MarketController.createPost);
MarketRouter.put("/update/:id",MarketController.updatePost);
MarketRouter.delete("/delete/:id",MarketController.deletePost);
MarketRouter.get("/products",MarketController.getAllPost);
MarketRouter.get("/product",MarketController.getOnePost);