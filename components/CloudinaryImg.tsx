import Image from "next/image";
import { buildUrl } from "cloudinary-build-url";
import { Box, chakra } from "@chakra-ui/react";

type CloudinaryImgProps = {
	publicId: string;
	height: number;
	width: number;
};

const ChakraNextUnwrappedImage = chakra(Image, {
	shouldForwardProp: (prop) =>
		["width", "height", "src", "alt", "placeholder", "blurDataURL"].includes(
			prop
		),
});

const CloudinaryImg = ({ publicId, height, width }: CloudinaryImgProps) => {
	const urlBlured = buildUrl(publicId, {
		cloud: {
			cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
		},
		transformations: {
			quality: 1,
		},
	});
	const url = buildUrl(publicId, {
		cloud: {
			cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
		},
		transformations: {
			frames: "auto",
			quality: "auto",
		},
	});

	return (
		<Box pos="relative" cursor="pointer" className="group" rounded="xl">
			<ChakraNextUnwrappedImage
				rounded="xl"
				w="auto"
				h="auto"
				width={width}
				height={height}
				placeholder="blur"
				blurDataURL={urlBlured}
				src={url}
				alt="Tidurr"
				transition="all 0.3s"
			/>
		</Box>
	);
};

export default CloudinaryImg;
