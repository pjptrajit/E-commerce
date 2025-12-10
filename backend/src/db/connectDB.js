import mongoose from "mongoose";

const { connect } = mongoose;

async function connectDB(url) {
  try {
    await connect(url);
    console.log("Database connected successfully.");
  } catch (error) {
    console.log(`Database connection failed: ${error.message}.`);
  }
}

export default connectDB;
