const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadOnCloudinary = async (localFilePath) => {
  // cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  // });

  try {
    if (!localFilePath) return null;

    const responce = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded successfully");
    fs.unlinkSync(localFilePath, () => {
      console.log("file removed successfully");
    });
    return responce.url;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove locally saved file on the operation got failed
    return null;
  }
};
module.exports = { uploadOnCloudinary };
