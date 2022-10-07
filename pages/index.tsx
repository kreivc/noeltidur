import type { NextPage } from "next";
import Head from "next/head";
import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { buildUrl } from "cloudinary-build-url";

interface Post {
	_id: string;
	title: string;
	date: string;
	description: string;
	image: string;
	imageBlur: string;
	publicId: string;
	height: number;
	width: number;
}
export namespace Post {
	export function fromJSON(json: any): Post {
		return {
			_id: json._id,
			title: json.title,
			date: json.date,
			description: json.description,
			image: json.image,
			imageBlur: urlBlurred(json.publicId),
			publicId: json.publicId,
			height: json.height,
			width: json.width,
		};
	}
}

const urlBlurred = (publicId: string) =>
	buildUrl(publicId, {
		cloud: {
			cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
		},
		transformations: {
			effect: {
				name: "blur:1000",
			},
			quality: 1,
		},
	});

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

			<Box w="full" mx="auto" sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}>
				{data.map((post) => (
					<Box key={post._id} w="full" borderRadius="xl" mb={2}>
						<Image
							loading="lazy"
							fallbackStrategy="beforeLoadOrError"
							fallbackSrc={post.imageBlur}
							src={post.image}
							borderRadius="xl"
							alt="Tidurrr"
						/>
					</Box>
				))}
			</Box>
		</div>
	);
};

export default Home;
