// src/Login.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { auth, provider } from './firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Logged in successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login failed.',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Signed in with Google!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Google Sign-in failed.',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack minH="100vh" justify="center" bg="black" color="white">
      <Box
        p={6}
        rounded="md"
        boxShadow="lg"
        bg="gray.800"
        width="300px"
        textAlign="center"
      >
        <Heading size="md" mb={4}>
          🚀 Astro Scope Login
        </Heading>

        <Stack spacing={3}>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            bg="white"
            color="black"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="white"
            color="black"
          />
          <Button colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
          <Text>or</Text>
          <Button onClick={handleGoogleSignIn} colorScheme="red">
            Sign in with Google
          </Button>
        </Stack>
      </Box>
    </VStack>
  );
};

export default Login;
