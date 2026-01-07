import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";

export const uploadOnCloudinary = async (localFilePath) => {
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
