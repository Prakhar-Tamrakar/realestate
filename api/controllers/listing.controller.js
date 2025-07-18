import e from "express";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res , next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
        
    } catch (error) {
        next(error);
        
    }
}

export const deleteListing = async (req, res, next) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
            res.status(200).json({
              success: true,
              message: "Listing  deleted successfully",
            })
            
    } catch (error) {
        next(errorHandler(error.message, 500));
    }


}