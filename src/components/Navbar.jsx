// src/components/Navbar.jsx
import {
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  Text,
  Spacer,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { FiLogOut, FiLogIn, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Box
      bg={useColorModeValue("gray.800", "gray.900")}
      px={6}
      py={4}
      shadow="md"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex align="center" wrap="wrap">
        <Heading size="md" color="teal.300">
          AstroScope 🚀
        </Heading>

        <Spacer />

        <HStack spacing={3} wrap="wrap">
          <Button as={RouterLink} to="/" variant="ghost" colorScheme="teal" size="sm">
            Home
          </Button>
          <Button as={RouterLink} to="/apod" variant="ghost" colorScheme="teal" size="sm">
            APOD
          </Button>
          <Button as={RouterLink} to="/planets" variant="ghost" colorScheme="teal" size="sm">
            Planets
          </Button>
          <Button as={RouterLink} to="/isro" variant="ghost" colorScheme="teal" size="sm">
            ISRO
          </Button>
          <Button as={RouterLink} to="/solar-system" variant="ghost" colorScheme="teal" size="sm">
            Solar System
          </Button>
          <Button as={RouterLink} to="/rocket-simulator" variant="ghost" colorScheme="teal" size="sm">
            🚀 Rocket
          </Button>
          <Button as={RouterLink} to="/asteroid-dodging" variant="ghost" colorScheme="teal" size="sm">
            🛰️ Asteroids
          </Button>
          <Button as={RouterLink} to="/about" variant="ghost" colorScheme="teal" size="sm">
            About Owner
          </Button>

          {user ? (
            <>
              <Text color="gray.300" fontSize="sm">
                Hi, {user.email}
              </Text>
              <IconButton
                icon={<FiLogOut />}
                aria-label="Logout"
                colorScheme="red"
                size="sm"
                onClick={handleLogout}
              />
            </>
          ) : (
            <>
              <IconButton
                as={RouterLink}
                to="/login"
                icon={<FiLogIn />}
                aria-label="Login"
                variant="outline"
                colorScheme="teal"
                size="sm"
              />
              <IconButton
                as={RouterLink}
                to="/signup"
                icon={<FiUserPlus />}
                aria-label="Sign Up"
                colorScheme="teal"
                size="sm"
              />
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
