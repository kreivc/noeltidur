import {
	HStack,
	Heading,
	IconButton,
	useColorMode,
	Button,
	Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useAudio } from "react-use";

const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const [audio, state, controls] = useAudio({
		src: "/toggle.mp3",
		autoPlay: false,
	});

	const play = () => {
		controls.play();
		toggleColorMode();
	};

	return (
		<HStack as="nav" justifyContent="space-between" alignItems="center" py={3}>
			{audio}
			<NextLink href="/" passHref>
				<Link _focus={{ outline: "none" }}>
					<Heading size="sm">NoelTidur.</Heading>
				</Link>
			</NextLink>
			<HStack alignItems="center" spacing={{ base: 0, md: 2 }}>
				<NextLink href="/admin" passHref>
					<Button as={Link} size="sm" variant="ghost">
						Admin
					</Button>
				</NextLink>
				<IconButton
					aria-label="toggle theme"
					icon={colorMode === "light" ? <IoMoon /> : <IoSunny />}
					variant="ghost"
					size="sm"
					onClick={play}
				/>
			</HStack>
		</HStack>
	);
};

export default Header;
