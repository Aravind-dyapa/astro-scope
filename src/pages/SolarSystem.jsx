import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Step 1

const MotionBox = motion(Box);

const planets = [
  { name: "Mercury", texture: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg", orbitRadius: 60, duration: 10, description: "Mercury is the closest planet to the Sun." },
  { name: "Venus", texture: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg", orbitRadius: 90, duration: 12, description: "Venus has a thick, toxic atmosphere." },
  { name: "Earth", texture: "https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg", orbitRadius: 120, duration: 14, description: "Earth is our home planet." },
  { name: "Mars", texture: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", orbitRadius: 150, duration: 16, description: "Mars is known as the Red Planet." },
  { name: "Jupiter", texture: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg", orbitRadius: 190, duration: 20, description: "Jupiter is the largest planet in the Solar System." },
  { name: "Saturn", texture: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg", orbitRadius: 230, duration: 24, description: "Saturn is famous for its stunning ring system.", hasRings: true },
  { name: "Uranus", texture: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg", orbitRadius: 270, duration: 28, description: "Uranus rotates on its side compared to other planets.", hasRings: true },
  { name: "Neptune", texture: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg", orbitRadius: 310, duration: 32, description: "Neptune is the most distant known planet." },
];

const quizQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    answer: "Mars",
    fact: "Mars has iron oxide on its surface, giving it a reddish appearance.",
  },
  {
    question: "Which planet has the most extensive ring system?",
    options: ["Saturn", "Uranus", "Neptune", "Jupiter"],
    answer: "Saturn",
    fact: "Saturn's rings are made mostly of ice particles with a smaller amount of rocky debris and dust.",
  },
  {
    question: "Which planet is farthest from the Sun?",
    options: ["Neptune", "Uranus", "Saturn", "Jupiter"],
    answer: "Neptune",
    fact: "Neptune is the eighth and most distant planet from the Sun in our solar system.",
  },
];

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const SolarSystem = () => {
  const [isRotating, setIsRotating] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const audioRef = useRef(null);
  const correctSound = useRef(new Audio("/sfx/correct.mp3"));
  const wrongSound = useRef(new Audio("/sfx/wrong.mp3"));
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate(); // ✅ Step 2

  useEffect(() => {
    correctSound.current.volume = 1.0;
    wrongSound.current.volume = 1.0;
    correctSound.current.load();
    wrongSound.current.load();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      isAudioPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isAudioPlaying]);

  const toggleRotation = () => setIsRotating((prev) => !prev);
  const toggleAudio = () => setIsAudioPlaying((prev) => !prev);

  const handlePlanetClick = (planet) => {
    setSelectedPlanet(planet);
    onOpen();
  };

  const handleAnswerSubmit = () => {
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.answer;

    if (isCorrect) {
      correctSound.current.play();
    } else {
      wrongSound.current.play();
    }

    toast({
      title: isCorrect ? "Correct!" : "Incorrect!",
      description: currentQ.fact,
      status: isCorrect ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      if (currentQuestionIndex + 1 < shuffledQuestions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption("");
      } else {
        setQuizMode(false);
      }
    }, 1000);
  };

  return (
    <Center
      h="100vh"
      bgImage="url('/stars-bg.jpg')"
      bgSize="cover"
      bgPosition="center"
      flexDir="column"
      color="white"
      position="relative"
      overflow="hidden"
    >
      <audio ref={audioRef} loop src="/interstellar.mp3" />

      {/* Controls */}
      <Box position="absolute" top={4} left={4} zIndex={3}>
        <IconButton
          icon={isAudioPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
          onClick={toggleAudio}
          aria-label="Toggle Audio"
          mr={2}
        />
        <Button onClick={toggleRotation} mr={2}>
          {isRotating ? "Stop Rotation" : "Start Rotation"}
        </Button>
        <Button
          onClick={() => {
            const shuffled = shuffleArray(quizQuestions).map((q) => ({
              ...q,
              options: shuffleArray(q.options),
            }));
            setShuffledQuestions(shuffled);
            setCurrentQuestionIndex(0);
            setSelectedOption("");
            setQuizMode(true);
          }}
          colorScheme="purple"
          mr={2}
        >
          Quiz Mode
        </Button>
        <Button
          onClick={() => navigate("/build-your-own")}
          colorScheme="green"
          mt={2}
        >
          🚀 Build Your Own Solar System
        </Button>
      </Box>

      {/* Sun */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="60px"
        h="60px"
        borderRadius="full"
        bg="yellow.400"
        boxShadow="0 0 30px 15px yellow"
        zIndex={2}
      />

      {/* Orbits + Planets */}
      {!quizMode &&
        planets.map((planet) => (
          <React.Fragment key={planet.name}>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              w={`${planet.orbitRadius * 2}px`}
              h={`${planet.orbitRadius * 2}px`}
              borderRadius="full"
              border="1px dashed rgba(255, 255, 255, 0.2)"
              transform="translate(-50%, -50%)"
              zIndex={1}
            />
            <MotionBox
              position="absolute"
              top="50%"
              left="50%"
              w="0"
              h="0"
              animate={isRotating ? { rotate: 360 } : { rotate: 0 }}
              transition={{
                repeat: Infinity,
                duration: planet.duration,
                ease: "linear",
              }}
              style={{ transformOrigin: "center" }}
            >
              <Box
                position="absolute"
                left={`${planet.orbitRadius}px`}
                top="-12px"
                w="24px"
                h="24px"
                borderRadius="full"
                backgroundImage={`url(${planet.texture})`}
                backgroundSize="cover"
                cursor="pointer"
                onClick={() => handlePlanetClick(planet)}
                boxShadow="0 0 6px rgba(255,255,255,0.3)"
              >
                {planet.hasRings && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%) rotate(25deg)"
                    w="38px"
                    h="8px"
                    border="2px solid rgba(255, 255, 255, 0.4)"
                    borderRadius="full"
                    pointerEvents="none"
                  />
                )}
                <Tooltip label={planet.name} hasArrow>
                  <Box w="100%" h="100%" borderRadius="full" />
                </Tooltip>
              </Box>
            </MotionBox>
          </React.Fragment>
        ))}

      {/* Quiz Mode */}
      {quizMode && shuffledQuestions.length > 0 && (
        <VStack
          spacing={6}
          bg="blackAlpha.800"
          p={8}
          borderRadius="lg"
          zIndex={3}
          position="relative"
          maxW="lg"
          mx="auto"
        >
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            🌟 Astronomy Quiz
          </Text>
          <Text fontSize="lg" textAlign="center">
            {shuffledQuestions[currentQuestionIndex].question}
          </Text>
          <RadioGroup onChange={setSelectedOption} value={selectedOption}>
            <Stack direction="column">
              {shuffledQuestions[currentQuestionIndex].options.map((opt, idx) => (
                <Radio key={idx} value={opt} colorScheme="yellow">
                  {opt}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Button
            colorScheme="teal"
            onClick={handleAnswerSubmit}
            isDisabled={!selectedOption}
            w="full"
          >
            Submit Answer
          </Button>
          <Button
            onClick={() => setQuizMode(false)}
            variant="outline"
            colorScheme="red"
            w="full"
          >
            Back to Solar System
          </Button>
        </VStack>
      )}

      {/* Planet Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.800" color="white">
          <ModalHeader>{selectedPlanet?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedPlanet?.description}</Text>
            <Text mt={2}>Orbit Duration: {selectedPlanet?.duration} seconds</Text>
            <Text>Distance from Sun: {selectedPlanet?.orbitRadius} units</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default SolarSystem;
