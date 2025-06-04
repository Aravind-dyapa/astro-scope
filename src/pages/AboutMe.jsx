// src/pages/AboutMe.jsx
import {
  Box,
  Heading,
  Text,
  Image,
  Link,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const AboutMe = () => {
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="2xl"
        borderRadius="2xl"
        p={8}
        maxW="500px"
        textAlign="center"
        w="full"
      >
        <Image
          borderRadius="full"
          boxSize="150px"
          src="/your-photo.png" // Place in /public
          alt="Aravind Reddy Dyapa"
          mx="auto"
          mb={4}
          objectFit="cover"
        />
        <Heading size="lg" mb={2}>
          Aravind Reddy Dyapa
        </Heading>
        <Text fontSize="sm" color="gray.400" mb={4}>
          Aspiring Developer | Space Enthusiast 🚀
        </Text>

        <Divider my={4} />

        <VStack spacing={3} fontSize="md" color={useColorModeValue("gray.700", "gray.300")}>
          <HStack spacing={1}>
            <Text fontWeight="semibold">📧 Email:</Text>
            <Text>aravindreddydyapa@gmail.com</Text>
          </HStack>
          <HStack spacing={1}>
            <Text fontWeight="semibold">📞 Contact:</Text>
            <Text>+91-6303123XXX</Text>
          </HStack>
          <HStack spacing={1}>
            <Text fontWeight="semibold">📸 Instagram:</Text>
            <Link href="https://instagram.com/aravind.dyapa" color="teal.400" isExternal>
              @aravind.dyapa
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default AboutMe;
