import type { NextPage } from "next";
import Head from "next/head";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	GridItem,
	Heading,
	Image,
	Input,
	Tooltip,
	SimpleGrid,
	Textarea,
	useToast,
	useBreakpointValue,
	useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import axios from "axios";

const Admin: NextPage = () => {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState(new Date());
	const [image, setImage] = useState<FileList | null>(null);
	const [description, setDescription] = useState("");
	const [state, setState] = useState<"initial" | "submitting" | "success">(
		"initial"
	);
	const colSpan = useBreakpointValue({ base: 2, md: 1 });
	const toast = useToast();
	const ShowImage = () => {
		let imageFile: string = "";
		if (image && image.length > 0) {
			imageFile = window.URL.createObjectURL(image[0]);
		}
		if (!imageFile) return <></>;

		return (
			<Image
				src={imageFile}
				alt="img preview"
				border="1px solid gray"
				rounded="lg"
				objectFit="fill"
				maxH="300px"
				mb="3"
			/>
		);
	};

	const postNow = async (e: React.FormEvent<EventTarget>) => {
		e.preventDefault();
		setState("submitting");

		if (!title || !date || !image) {
			setState("initial");
			return toast({
				title: "😴😪💤",
				description: "All field except description should be filled",
				status: "error",
				duration: 1000,
				isClosable: true,
			});
		}

		if (image === null) return;
		const formData = new FormData();
		formData.append("title", title);
		formData.append("date", date.toString());
		formData.append("description", description);
		formData.append("image", image[0]);

		try {
			await axios({
				method: "post",
				url: "/api/post",
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
			});
			setState("success");
			return toast({
				title: "😴😪💤",
				description: "Successfully added tidur post 😴",
				status: "success",
				duration: 1000,
				isClosable: true,
			});
		} catch (error) {
			setState("initial");
			return toast({
				title: "😴😪💤",
				description: "Upload failed, something went wrong",
				status: "error",
				duration: 1000,
				isClosable: true,
			});
		}
	};

	return (
		<Box w="full">
			<Head>
				<title>Upload Tidur Pose 😴</title>
				<meta name="description" content="Upload Tidur Pose 😴" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box w="full">
				<Heading size="lg" pb="3">
					Upload Tidur Pose 😴
				</Heading>
				<Flex
					direction={{ base: "column", md: "row" }}
					p={{ base: "4", md: "7" }}
					rounded="md"
					boxShadow={useColorModeValue(
						"lg",
						"rgba(252, 252, 252, 0.25) 0px 0px 5px 1px, rgba(255, 255, 255, 0.1) 0px 0px 1px 0px"
					)}
				>
					<Box as="form" w="100%" onSubmit={postNow}>
						<SimpleGrid columns={2} columnGap={3} rowGap={4} w="full">
							<GridItem colSpan={colSpan}>
								<FormControl>
									<FormLabel>Title</FormLabel>
									<Input
										placeholder="Title"
										type="text"
										onChange={(e) => setTitle(e.target.value)}
										value={title}
										disabled={state === "submitting"}
									/>
								</FormControl>
							</GridItem>
							<GridItem colSpan={colSpan}>
								<FormControl>
									<FormLabel>Date</FormLabel>
									<SingleDatepicker
										name="date-input"
										date={date}
										onDateChange={setDate}
									/>
								</FormControl>
							</GridItem>
							<GridItem colSpan={2}>
								<FormControl>
									<FormLabel>Image</FormLabel>
									<Box maxH="500px">
										<ShowImage />
									</Box>
									<Tooltip label="Add Thumbnail" placement="top" fontSize="lg">
										<FormLabel
											justifyContent="center"
											htmlFor="image"
											border="1px solid gray"
											p="2"
											cursor="pointer"
										>
											<AiOutlinePlus />
										</FormLabel>
									</Tooltip>
									<Input
										id="image"
										type="file"
										accept="image/*"
										display="none"
										w="1"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
											setImage(e.target.files);
										}}
									/>
								</FormControl>
							</GridItem>
							<GridItem colSpan={2}>
								<FormControl>
									<FormLabel>Description</FormLabel>
									<Textarea
										placeholder="Message"
										onChange={(e) => setDescription(e.target.value)}
										value={description}
										disabled={state === "submitting"}
									/>
								</FormControl>
							</GridItem>
							<GridItem colSpan={2} display="flex" alignItems="center" w="full">
								<Button
									w="full"
									type="submit"
									isLoading={state === "submitting"}
								>
									Upload
								</Button>
							</GridItem>
						</SimpleGrid>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};

export default Admin;
