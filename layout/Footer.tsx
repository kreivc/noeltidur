import { Box } from "@chakra-ui/react";

const Footer = () => {
	return (
		<Box pb={8} as="footer" textAlign="center">
			<small>&copy; Copyright {new Date().getFullYear()}, Kreivc</small>
		</Box>
	);
};

export default Footer;
