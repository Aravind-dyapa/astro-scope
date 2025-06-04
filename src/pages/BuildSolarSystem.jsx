import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Input,
  NumberInput,
  NumberInputField,
  VStack,
  HStack,
  Checkbox,
  Text,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const BuildSolarSystem = () => {
  const [planets, setPlanets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    size: 24,
    orbitRadius: 100,
    color: "#ffffff",
    hasRings: false,
  });
  const toast = useToast();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const addPlanet = () => {
    if (!form.name.trim()) {
      toast({
        title: "Name required",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setPlanets([...planets, form]);
    setForm({
      name: "",
      size: 24,
      orbitRadius: form.orbitRadius + 40,
      color: "#ffffff",
      hasRings: false,
    });
  };

  return (
    <Center
      minH="100vh"
      bgImage="url('/stars-bg.jpg')"
      bgSize="cover"
      color="white"
      flexDir="column"
      py={10}
      px={4}
    >
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        🚀 Build Your Own Solar System
      </Text>

      <VStack
        bg="blackAlpha.600"
        p={6}
        borderRadius="lg"
        spacing={4}
        w="full"
        maxW="md"
      >
        <Input
          placeholder="Planet Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <HStack w="full">
          <Text flexShrink={0}>Size:</Text>
          <NumberInput
            value={form.size}
            min={10}
            max={50}
            onChange={(val) => handleChange("size", parseInt(val))}
            w="full"
          >
            <NumberInputField />
          </NumberInput>
        </HStack>
        <HStack w="full">
          <Text flexShrink={0}>Orbit Radius:</Text>
          <NumberInput
            value={form.orbitRadius}
            min={60}
            max={400}
            onChange={(val) => handleChange("orbitRadius", parseInt(val))}
            w="full"
          >
            <NumberInputField />
          </NumberInput>
        </HStack>
        <HStack w="full">
          <Text flexShrink={0}>Color:</Text>
          <Input
            type="color"
            value={form.color}
            onChange={(e) => handleChange("color", e.target.value)}
          />
        </HStack>
        <Checkbox
          isChecked={form.hasRings}
          onChange={(e) => handleChange("hasRings", e.target.checked)}
        >
          Add Rings?
        </Checkbox>
        <Button colorScheme="teal" onClick={addPlanet} w="full">
          Add Planet
        </Button>
      </VStack>

      {/* Sun and Custom Planets */}
      <Box position="relative" mt={12} w="full" h="500px">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="60px"
          h="60px"
          bg="yellow.400"
          borderRadius="full"
          boxShadow="0 0 30px 10px yellow"
          zIndex={2}
        />
        {planets.map((planet, index) => (
          <MotionBox
            key={index}
            position="absolute"
            top="50%"
            left="50%"
            w="0"
            h="0"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20 + index * 2,
              ease: "linear",
            }}
            style={{ transformOrigin: "center" }}
          >
            <Box
              position="absolute"
              left={`${planet.orbitRadius}px`}
              top={`-${planet.size / 2}px`}
              w={`${planet.size}px`}
              h={`${planet.size}px`}
              bg={planet.color}
              borderRadius="full"
              boxShadow="0 0 6px rgba(255,255,255,0.4)"
            >
              {planet.hasRings && (
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%) rotate(30deg)"
                  w={`${planet.size * 1.8}px`}
                  h="8px"
                  border="2px solid rgba(255, 255, 255, 0.4)"
                  borderRadius="full"
                  pointerEvents="none"
                />
              )}
            </Box>
          </MotionBox>
        ))}
      </Box>
    </Center>
  );
};

export default BuildSolarSystem;
