import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const isroMissions = [
  {
    title: 'Chandrayaan-1 (2008)',
    detail: 'India’s first mission to the Moon. Discovered water molecules on the lunar surface.',
  },
  {
    title: 'Mangalyaan (Mars Orbiter Mission, 2013)',
    detail: 'ISRO became the first Asian agency to reach Mars orbit — in its first attempt!',
  },
  {
    title: 'Chandrayaan-2 (2019)',
    detail: 'Follow-up Moon mission with orbiter and lander. Orbiter continues successful operations.',
  },
  {
    title: 'Chandrayaan-3 (2023)',
    detail: 'India became the **first country** to land near the Moon’s south pole.',
  },
  {
    title: 'PSLV & GSLV Launch Vehicles',
    detail: 'Reliable indigenous rockets used for dozens of satellite launches.',
  },
  {
    title: 'Cartosat Series',
    detail: 'Earth observation satellites for mapping, disaster monitoring, and urban planning.',
  },
  {
    title: 'Aditya-L1 (2023)',
    detail: 'India’s first solar mission to study the Sun’s outer layers.',
  },
  {
    title: 'Gaganyaan (Upcoming)',
    detail: 'India’s first crewed space mission planned for low Earth orbit.',
  },
];

const ISRO = () => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHover = useColorModeValue('teal.100', 'teal.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <Box px={[4, 8]} py={10} bgGradient="linear(to-b, gray.900, black)" minHeight="100vh">
      <Box textAlign="center" mb={12}>
        <Heading size="2xl" color="teal.300">
          🇮🇳 ISRO's Legacy in Space
        </Heading>
        <Text fontSize="lg" color="gray.400" mt={3}>
          “Sky is not the limit, it’s just the beginning.” – ISRO
        </Text>
      </Box>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {isroMissions.map((mission) => (
          <Card
            key={mission.title}
            bg={cardBg}
            color={textColor}
            borderRadius="xl"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{
              transform: 'scale(1.03)',
              bg: cardHover,
              boxShadow: 'xl',
            }}
          >
            <CardHeader display="flex" alignItems="center" gap={2}>
              <Icon as={CheckCircleIcon} color="teal.400" />
              <Heading size="md">{mission.title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{mission.detail}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ISRO;
