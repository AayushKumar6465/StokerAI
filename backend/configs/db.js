import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err.message);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
