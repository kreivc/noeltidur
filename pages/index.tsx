import type { GetStaticProps } from "next";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import CloudinaryImg from "../components/CloudinaryImg";

interface Post {
	_id: string;
	title: string;
	date: string;
	description: string;
	image: string;
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
			publicId: json.publicId,
			height: json.height,
			width: json.width,
		};
	}
}

const Home = ({ posts }: { posts: Post[] }) => {
	return (
		<div>
			<Head>
				<title>Noel Tidur 😴</title>
				<meta name="description" content="Noel Tidur 😴" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box
				w="full"
				mb={2}
				mx="auto"
				sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}
			>
				{posts.map((post) => (
					<Box key={post._id} rounded="xl">
						<CloudinaryImg
							publicId={post.publicId}
							width={post.width}
							height={post.height}
						/>
					</Box>
				))}
			</Box>
		</div>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const {
		data: { posts },
	} = await axios.get(`${process.env.BASE_URL}/api/post`);
	return {
		props: {
			posts,
		},
		revalidate: 10,
	};
};
