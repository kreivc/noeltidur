import type { NextPage } from "next";
import Head from "next/head";
import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import CloudinaryImg from "../components/CloudinaryImg";

interface Post {
	_id?: string;
	title?: string;
	date?: string;
	description?: string;
	image?: string;
	publicId?: string;
	height?: number;
	width?: number;
}

export namespace Post {
	export function fromJSON(json: any): Post {
		return {
			_id: json._id,
			title: json.title,
			date: json.date,
			description: json.description,
			image: json.image,
			publicId: json.publicId,
			height: json.height,
			width: json.width,
		};
	}
}

const Home: NextPage = () => {
	const [data, setData] = useState<Post[]>([]);

	useEffect(() => {
		const getData = async () => {
			const datas = await axios.get("/api/post");
			setData((datas.data.posts as []).map((val) => Post.fromJSON(val)));
		};
		getData();
	}, []);

	return (
		<div>
			<Head>
				<title>Noel Tidur 😴</title>
				<meta name="description" content="Noel Tidur 😴" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box
				w="100%"
				maxW="900px"
				mx="auto"
				bg="gray.800"
				sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}
			>
				{data.map((post) => (
					// <CloudinaryImg
					// 	key={post?._id!}
					// 	publicId={post?.publicId!}
					// 	height={post?.height!}
					// 	width={post?.width!}
					// 	rounded="xl"
					// />
					<Image
						key={post._id}
						w="100%"
						borderRadius="xl"
						mb={2}
						src={post.image}
						alt="Alt"
					/>
				))}
			</Box>
		</div>
	);
};

export default Home;
