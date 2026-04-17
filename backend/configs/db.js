import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      console.log("MongoDB connected");
      mongoose.connection.on("error", (err) => {
        console.error("MongoDB error:", err.message);
      });
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${i + 1}/${retries} failed:`, error.message);
      if (i < retries - 1) {
        const delay = Math.min(1000 * 2 ** i, 10000);
        console.log(`Retrying in ${delay / 1000}s...`);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  console.error("MongoDB connection failed after all retries");
  process.exit(1);
};

export default connectDB;
