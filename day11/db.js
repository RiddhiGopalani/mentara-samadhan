import mongoose from "mongoose";

async function connectDB(uri = "mongodb://localhost:27017/studentdb") {
  if (!uri) throw new Error("MONGO_URI not provided");
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
}

export default connectDB;
