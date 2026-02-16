// import cloudinary from 'cloudinary'
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import dotenv from "dotenv";
// dotenv.config();

// cloudinary.v2.config({
//   cloud_name:process.env.CLOUD_NAME,
//   api_key:process.env.CLOUD_API_KEY,
//   api_secret:process.env.CLOUD_API_SECRET
// })

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary.v2,
//   params: {
//     folder: 'ApnaGhar_Dev',
//     allowed_formats: ['png','jpg','jpeg']
//   },
// });

// export {cloudinary,storage}

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;