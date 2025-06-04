// src/pages/Home.jsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import {
  FaMeteor,
  FaRocket,
  FaSatellite,
  FaMoon,
  FaStar,
  FaSun,
  FaGlobe,
} from "react-icons/fa";

const themes = [
  {
    title: "Exoplanets",
    description: "Planets beyond our solar system — some may be Earth-like.",
    icon: FaGlobe,
    color: "blue.300",
  },
  {
    title: "Supernova",
    description: "A powerful stellar explosion — the death of massive stars.",
    icon: FaStar,
    color: "yellow.400",
  },
  {
    title: "Rocket Launch",
    description: "Explore rocket science and launch technology.",
    icon: FaRocket,
    color: "red.400",
  },
  {
    title: "Satellites",
    description: "Learn how satellites orbit and gather data.",
    icon: FaSatellite,
    color: "teal.400",
  },
  {
    title: "Asteroids",
    description: "Rocky leftovers from the formation of planets.",
    icon: FaMeteor,
    color: "orange.400",
  },
  {
    title: "The Moon",
    description: "Earth’s lunar companion — full of secrets.",
    icon: FaMoon,
    color: "gray.400",
  },
  {
    title: "The Sun",
    description: "The powerhouse of our solar system.",
    icon: FaSun,
    color: "yellow.300",
  },
];

const Home = () => {
  const cardBg = useColorModeValue("gray.800", "gray.700");

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, black, gray.900)"
      color="white"
      px={6}
      py={12}
    >
      <VStack spacing={4} textAlign="center" mb={10}>
        <Heading fontSize={{ base: "3xl", md: "5xl" }}>Explore the Cosmos</Heading>
        <Text fontSize="lg" maxW="2xl">
          Dive into the wonders of space — from exploding stars to distant planets.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} maxW="6xl" mx="auto">
        {themes.map((item, index) => (
          <Box
            key={index}
            bg={cardBg}
            p={6}
            rounded="2xl"
            shadow="lg"
            border="1px"
            borderColor="gray.600"
            _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
          >
            <VStack spacing={4}>
              <Icon as={item.icon} boxSize={10} color={item.color} />
              <Heading size="md">{item.title}</Heading>
              <Text fontSize="sm" color="gray.300" textAlign="center">
                {item.description}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
