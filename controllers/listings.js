import { Listing } from "../models/listing.models.js";

export const index = async (req, res) => {
  const result = await Listing.find({});
  res.render("./listings/index.ejs", { result });
};

export const renderNewForm = async (req, res) => {
  res.render("./listings/new.ejs");
};

export const showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing });
};

export const createListing = async (req, res, next) => {

  let mapToken=process.env.MAP_TOKEN;
  let location=req.body.listing.location;
  const response=await fetch(`https://us1.locationiq.com/v1/search.php?key=${mapToken}&q=${location}&format=json&limit=1`)
  const data = await response.json();
  if (!data.length) {
      req.flash("error", "Invalid location entered");
      return res.redirect("/listings/new");
    }
  const { lat, lon } = data[0];
  const geoData = {
      type: "Point",
      coordinates: [parseFloat(lon), parseFloat(lat)], // [lng, lat]
    };

  let url = req.file.path;
  let filename = req.file.filename;

  let newListing = req.body.listing;
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry=geoData;

  await new Listing(newListing).save();
  req.flash("success", "New Listing Created");
  return res.redirect("/listings");
};

export const renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "listing you requested for does not exist");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("./listings/edit.ejs", { listing,originalImageUrl });
};

export const updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== undefined) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { filename, url };
    await listing.save();
  }

  req.flash("success", "listing details updated");
  return res.redirect(`/listings/${id}`);
};

export const destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted!");
  return res.redirect("/listings");
};
