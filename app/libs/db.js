import mongoose from "mongoose";

const db_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(db_URI);
    console.log(" Database Connected... ✔");
  } catch (error) {
    console.log("db connect error ===", error);
  }
};

export default dbConnect;
