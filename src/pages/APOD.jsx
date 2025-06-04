import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Spinner,
  Center,
  Link
} from '@chakra-ui/react';

const APOD = () => {
  const [apodData, setApodData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
      .then((res) => res.json())
      .then((data) => {
        setApodData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" color="teal.400" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>
        🌠 {apodData.title}
      </Heading>
      {apodData.media_type === 'image' ? (
        <Image
          src={apodData.url}
          alt={apodData.title}
          borderRadius="lg"
          maxH="500px"
          objectFit="cover"
          mb={4}
        />
      ) : (
        <Box as="iframe" src={apodData.url} width="100%" height="400px" mb={4} />
      )}
      <Text fontSize="md" color="gray.300" mb={2}>
        {apodData.date}
      </Text>
      <Text>{apodData.explanation}</Text>
      <Text mt={4}>
        Source:{' '}
        <Link href="https://apod.nasa.gov/" color="teal.300" isExternal>
          NASA APOD
        </Link>
      </Text>
    </Box>
  );
};

export default APOD;
