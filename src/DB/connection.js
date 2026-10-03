import mongoose from "mongoose";
import { DB_URI } from "../../config/confi.service.js";

const connectDB = async () => {
  try {
     mongoose.connection.on ("connected" , ()=>{
console.log("mongoDB connected successfully");
     }) 
     mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 3000,
    });

    console.log("Database Connected");
  } catch (error) {
    console.log("Error connecting to Database:", error);
  }
};

export default connectDB;
