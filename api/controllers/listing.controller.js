import e from "express";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    if (listing.userRef.toString() !== req.user.id) {
      return next(errorHandler(403, "You can only delete your own listings!"));
    }
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Listing  deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (listing.userRef.toString() !== req.user.id) {
    return next(errorHandler(403, "You can only update your own listings!"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedListing,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const getListings = async (req, res, next) =>{

  try {

    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if(offer == undefined || offer == "false") offer = { $in : [false,true] }

    let furnished = req.query.furnished;
    if(furnished == undefined || furnished == "false")
      furnished = { $in : [false , true]}

    let parking = req.query.parking;
    if( parking == undefined || parking == "false")
      parking = { $in: [ false , true]}

    let type = req.query.type;
    if(type == undefined || type == "all")
      type = {$in : ["sell" ]}

    let location = req.query.location || "";

    let searchTerm = req.query.searchTerm || "";
    let sort = req.query.sort || "createdAt";
    let order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      address: { $regex: location, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
    
  } catch (error) {
    next(error)
  }



}

