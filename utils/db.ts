import mongoose from "mongoose";

const connectDB = () => {
	if (mongoose.connections[0].readyState) {
		return;
	}
	mongoose.connect(process.env.MONGODB_URL ?? "Insert MONGODB_URL PLS!");
};

export default connectDB;
