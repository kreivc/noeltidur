import { PropsWithChildren } from "react";
import { VStack, Container, Box } from "@chakra-ui/react";

import Header from "./Navbar";
import Footer from "./Footer";
import ToTop from "./ToTop";

type Props = PropsWithChildren<{}>;

const Layout = ({ children }: Props) => {
	return (
		<Container
			display="flex"
			maxW="container.md"
			minH="100vh"
			px={{ base: 4, md: 0 }}
			centerContent
		>
			<VStack flex={1} spacing={16} alignItems="stretch" w="full">
				<Header />
				<Box flex={1} w="full" as="section">
					<VStack spacing={16} w="full">
						{children}
					</VStack>
				</Box>
				<Footer />
			</VStack>
			<ToTop />
		</Container>
	);
};

export default Layout;
