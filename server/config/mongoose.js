const mongoose =require("mongoose");
require("dotenv").config();

const connectDB=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL);
      console.log("database connect successfully")
      } 
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    } 
}

module.exports = connectDB;
