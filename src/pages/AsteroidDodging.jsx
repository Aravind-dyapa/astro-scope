import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  Input,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import spaceshipImg from '../assets/spaceship.png';
import asteroidImg from '../assets/asteroid.png';
import hitSound from '../assets/hit.mp3';
import backgroundMusic from '../assets/background.mp3';

const MotionBox = motion(Box);

const AsteroidDodging = () => {
  const [position, setPosition] = useState(200);
  const [asteroids, setAsteroids] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState(() => {
    const stored = localStorage.getItem('asteroidLeaderboard');
    return stored ? JSON.parse(stored) : [];
  });
  const [gameStarted, setGameStarted] = useState(false);
  const audioRef = useRef();

  // Background Music
  useEffect(() => {
    if (gameStarted && audioRef.current) {
      audioRef.current.play().catch((e) => console.error('Audio error:', e));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [gameStarted]);

  // Spaceship movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setPosition((prev) => Math.max(prev - 20, 0));
      if (e.key === 'ArrowRight') setPosition((prev) => Math.min(prev + 20, 380));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Spawn asteroids
  useEffect(() => {
    if (gameOver || !gameStarted) return;
    const interval = setInterval(() => {
      const newAsteroid = {
        id: Date.now(),
        x: Math.floor(Math.random() * 360),
        y: -50,
      };
      setAsteroids((prev) => [...prev, newAsteroid]);
    }, 800);
    return () => clearInterval(interval);
  }, [gameOver, gameStarted]);

  // Move asteroids
  useEffect(() => {
    if (gameOver || !gameStarted) return;
    const moveInterval = setInterval(() => {
      setAsteroids((prevAsteroids) =>
        prevAsteroids.map((a) => ({ ...a, y: a.y + 10 }))
      );
      setScore((prev) => prev + 1);
    }, 100);
    return () => clearInterval(moveInterval);
  }, [gameOver, gameStarted]);

  // Collision detection
  useEffect(() => {
    for (const asteroid of asteroids) {
      if (
        asteroid.y > 460 &&
        asteroid.y < 500 &&
        asteroid.x > position - 40 &&
        asteroid.x < position + 40
      ) {
        const hit = new Audio(hitSound);
        hit.play();
        setGameOver(true);
        break;
      }
    }
  }, [asteroids, position]);

  // Save score to leaderboard
  useEffect(() => {
    if (gameOver && playerName.trim() !== '') {
      setLeaderboard((prev) =>
        [...prev, { name: playerName, score }]
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
      );
    }
  }, [gameOver]);

  // Persist leaderboard to localStorage
  useEffect(() => {
    localStorage.setItem('asteroidLeaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  const startGame = () => {
    if (playerName.trim() === '') return;
    setGameOver(false);
    setAsteroids([]);
    setScore(0);
    setPosition(200);
    setGameStarted(true);
  };

  const restartGame = () => {
    setGameOver(false);
    setAsteroids([]);
    setScore(0);
    setPosition(200);
    setGameStarted(true);
  };

  const clearLeaderboard = () => {
    localStorage.removeItem('asteroidLeaderboard');
    setLeaderboard([]);
  };

  return (
    <VStack minH="100vh" bg="black" color="white" spacing={6} py={6}>
      <audio ref={audioRef} loop src={backgroundMusic} />

      <Text fontSize="3xl" fontWeight="bold">
        ☄️ Asteroid Dodging
      </Text>

      {!gameStarted && (
        <VStack spacing={3}>
          <Input
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            bg="white"
            color="black"
          />
          <Button onClick={startGame} colorScheme="teal">
            Start the Game
          </Button>
        </VStack>
      )}

      {gameStarted && (
        <>
          <Text fontSize="xl">Score: {score}</Text>

          <Box
            position="relative"
            width="400px"
            height="500px"
            border="2px solid white"
            overflow="hidden"
            bg="gray.900"
            borderRadius="lg"
          >
            {/* Spaceship */}
            <Image
              src={spaceshipImg}
              alt="Spaceship"
              position="absolute"
              bottom="10px"
              left={`${position}px`}
              boxSize="50px"
            />

            {/* Asteroids */}
            {asteroids.map((asteroid) => (
              <Image
                key={asteroid.id}
                src={asteroidImg}
                alt="Asteroid"
                position="absolute"
                top={`${asteroid.y}px`}
                left={`${asteroid.x}px`}
                boxSize="40px"
              />
            ))}
          </Box>

          {gameOver && (
            <VStack spacing={3}>
              <Text fontSize="2xl" color="red.400">
                💥 Game Over!!
              </Text>
              <Text>Final Score: {score}</Text>
              <Button onClick={restartGame} colorScheme="red">
                🔁 Restart Game
              </Button>
            </VStack>
          )}

          {/* Leaderboard */}
          <Box textAlign="left" mt={6}>
            <Text fontSize="xl" fontWeight="bold">
              🏆 Leaderboard
            </Text>
            <VStack align="start" spacing={1}>
              {leaderboard.map((entry, index) => (
                <HStack key={index}>
                  <Text>{index + 1}.</Text>
                  <Text>{entry.name}</Text>
                  <Text color="yellow.300">– {entry.score}</Text>
                </HStack>
              ))}
              {leaderboard.length > 0 && (
                <Button
                  size="sm"
                  colorScheme="pink"
                  mt={2}
                  onClick={clearLeaderboard}
                >
                  Clear Leaderboard
                </Button>
              )}
            </VStack>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default AsteroidDodging;
