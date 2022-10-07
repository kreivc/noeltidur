import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoChevronUp } from "react-icons/io5";
import { useAudio } from "react-use";

const ToTop = () => {
	const [scrollNav, setScrollNav] = useState(false);

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const changeNav = () => {
		if (window.scrollY >= 80) {
			setScrollNav(true);
		} else {
			setScrollNav(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", changeNav);
	}, []);

	const [audio, state, controls] = useAudio({
		src: "/toggle.mp3",
		autoPlay: false,
	});

	const play = () => {
		controls.play();
		scrollTop();
	};

	return (
		<Box
			visibility={scrollNav ? "visible" : "hidden"}
			opacity={scrollNav ? "0.85" : "0"}
			transition="all 0.6s ease"
			pos="fixed"
			bottom={5}
			right={5}
			onClick={play}
			zIndex={99}
		>
			{audio}
			<Button
				p={{ base: "5", md: "6" }}
				fontSize={{ base: "2xl", md: "3xl" }}
				shadow="md"
				_focus={{ outline: "none" }}
				color="blue.400"
				zIndex={99}
			>
				<IoChevronUp />
			</Button>
		</Box>
	);
};

export default ToTop;
