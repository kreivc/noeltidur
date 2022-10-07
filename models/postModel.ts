import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		image: {
			type: String,
			required: true,
		},
		publicId: {
			type: String,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
		width: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

let Post = mongoose.models.posts || mongoose.model("posts", postSchema);
export default Post;
