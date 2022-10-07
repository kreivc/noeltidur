import Image from "next/image";
import { buildUrl } from "cloudinary-build-url";
import { Box } from "@chakra-ui/react";

type CloudinaryImgProps = {
	publicId: string;
	height: number;
	width: number;
	rounded: string;
};

const CloudinaryImg = ({
	publicId,
	height,
	width,
	rounded,
}: CloudinaryImgProps) => {

	const urlBlurred = buildUrl(publicId, {
		cloud: {
			cloudName: "dor0udr7t",
		},
		transformations: {
			effect: {
				name: "blur:1000",
			},
			quality: 1,
		},
	});

	const url = buildUrl(publicId, {
		cloud: {
			cloudName: "dor0udr7t",
		},
	});

	return (
		<>
			<Box
				pos="relative"
				height="0"
				pt={`${(height / width) * 100}%`}
				bgImage={`url(${urlBlurred})`}
				bgPos="center center"
				bgRepeat="no-repeat"
				bgSize="100%"
				cursor="pointer"
				rounded={rounded}
			>
				<Box pos="absolute" top={0} left={0}>
					<Image
						width={width}
						height={height}
						src={url}
						alt="Project Image"
						unoptimized={true}
						objectFit="cover"
					/>
				</Box>
			</Box>
		</>
	);
};

export default CloudinaryImg;
