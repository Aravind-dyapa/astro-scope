import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, HStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import rocketImg from '../assets/rocket.svg';
import launchSound from '../assets/launch.mp3';

const MotionBox = motion(Box);
const MotionDiv = motion.div;

const RocketSimulator = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [missionName, setMissionName] = useState('');
  const [launchTime, setLaunchTime] = useState(null);
  const toast = useToast();

  const missionNames = ['Luna Falcon', 'Astro Nova', 'Cosmic Rider', 'Stellar-X', 'Vega Prime'];

  const resetSimulator = () => {
    setIsLaunched(false);
    setCountdown(null);
    setShowResult(false);
    setLaunchTime(null);
    generateMission();
  };

  const generateMission = () => {
    const random = Math.floor(Math.random() * missionNames.length);
    setMissionName(missionNames[random]);
  };

  useEffect(() => {
    generateMission();
  }, []);

  const startLaunchSequence = () => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      setCountdown(count);

      if (count === 0) {
        clearInterval(interval);
        triggerLaunch();
      }
    }, 1000);
  };

  const triggerLaunch = () => {
    const audio = new Audio(launchSound);
    audio.play();
    setIsLaunched(true);
    setLaunchTime(new Date().toLocaleTimeString());

    setTimeout(() => {
      setShowResult(true);
      toast({
        title: '🚀 Mission Update',
        description: 'Rocket is now in orbit!',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    }, 4000);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #0a0a23, #000)"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
      p={6}
    >
      {/* Star background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        backgroundImage="url('https://www.transparenttextures.com/patterns/stardust.png')"
        opacity={0.2}
      />

      <VStack spacing={6} zIndex={2}>
        <Text fontSize="2xl" fontWeight="bold">
          🛰️ Mission: {missionName}
        </Text>

        {countdown !== null && countdown > 0 ? (
          <Text fontSize="4xl" color="yellow.300">
            🚀 Launch in {countdown}...
          </Text>
        ) : countdown === 0 ? (
          <Text fontSize="4xl" color="green.300">
            Liftoff! 🌌
          </Text>
        ) : !isLaunched ? (
          <Button onClick={startLaunchSequence} colorScheme="red" size="lg">
            Initiate Launch
          </Button>
        ) : null}

        {/* Rocket */}
        <MotionBox
          initial={{ y: 0 }}
          animate={
            isLaunched
              ? { y: [-10, -300, -600, -1000], scale: [1, 1.05, 1.1] }
              : { y: 0 }
          }
          transition={{ duration: 4, ease: 'easeInOut' }}
          position="relative"
        >
          <Box position="relative" display="flex" flexDirection="column" alignItems="center">
            <img src={rocketImg} alt="Rocket" width="120" />

            {/* Fire effect */}
            {isLaunched && (
              <MotionDiv
                style={{
                  width: 40,
                  height: 100,
                  background: 'radial-gradient(circle, orange, red)',
                  borderRadius: '50%',
                  filter: 'blur(10px)',
                  marginTop: -10,
                }}
                animate={{
                  opacity: [1, 0.8, 0.4, 0],
                  scale: [1, 1.2, 1],
                  y: [0, 20, 40],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                }}
              />
            )}

            {/* Launchpad */}
            {!isLaunched && (
              <Box
                mt={4}
                width="150px"
                height="20px"
                bg="gray.600"
                borderRadius="full"
                boxShadow="0 0 10px #888"
              />
            )}
          </Box>
        </MotionBox>

        {/* Mission Stats */}
        {showResult && (
          <Box
            mt={6}
            bg="gray.800"
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            textAlign="center"
          >
            <Text fontSize="xl" mb={2}>✅ Mission Status: Success</Text>
            <Text>🕒 Launched at: {launchTime}</Text>
            <Text>🌍 Orbit Entry Confirmed</Text>
            <Button mt={4} onClick={resetSimulator} colorScheme="teal">
              🔁 Launch Again
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default RocketSimulator;
