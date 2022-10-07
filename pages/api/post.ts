import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import formidable, { Fields } from "formidable";
import Post from "../../models/postModel";
import connectDB from "../../utils/db";

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

interface FieldDatas {
	title?: string;
	date?: string;
	description?: string;
	image?: string;
	publicId?: string;
	height?: number;
	width?: number;
}

export const config = {
	api: {
		bodyParser: false,
	},
};

connectDB();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case "POST":
			await upload(req, res);
			break;

		case "GET":
			await getAllPost(req, res);
			break;

		default:
			break;
	}
}

const upload = async (req: NextApiRequest, res: NextApiResponse) => {
	const form = new formidable.IncomingForm();
	let data: FieldDatas = {};
	form.parse(req, async (err: any, fields: Fields, files: any) => {
		if (fields?.password !== process.env.PASSWORD)
			return res.status(400).json({ message: "Wrong Password" });
		await cloudinary.uploader.upload(
			files.image?.filepath,
			async (err_c: any, result: any) => {
				data = {
					title: fields?.title as string,
					date: fields?.date as string,
					description: fields?.description as string,
					image: result?.secure_url as string,
					publicId: result?.public_id as string,
					height: result?.height as number,
					width: result?.width as number,
				};
				const newPost = new Post({
					...data,
				});
				await newPost.save();
				return res
					.status(200)
					.json({ message: "Successfully upload tidur pose" });
			}
		);
	});
};

const getAllPost = async (req: NextApiRequest, res: NextApiResponse) => {
	let posts;
	posts = await Post.find();
	res.status(200).json({ posts });
};
