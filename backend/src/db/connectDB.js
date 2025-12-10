import mongoose from "mongoose";

const { connect } = mongoose;

async function connectDB() {
  try {
    await connect("mongodb://localhost:27017/momoHouse");
    console.log("Database connected successfully.");
  } catch (error) {
    console.log(`Database connection failed: ${error.message}.`);
  }
}

export default connectDB;
