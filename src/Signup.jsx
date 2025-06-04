// src/Signup.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Account created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Signup failed',
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
          ✨ Create Account
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
          <Button colorScheme="teal" onClick={handleSignup}>
            Sign Up
          </Button>
        </Stack>
      </Box>
    </VStack>
  );
};

export default Signup;
