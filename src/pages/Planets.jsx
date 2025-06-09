import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Heading,
  Card,
  CardBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  // Button
} from '@chakra-ui/react';
import { useState } from 'react';

const planets = [
  {
    name: 'Mercury',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg',
    description: 'Smallest planet and closest to the Sun.',
    more: 'Mercury has no atmosphere to retain heat, so it has extreme temperature variations.'
  },
  {
    name: 'Venus',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg',
    description: 'Second planet from the Sun, shrouded in thick clouds.',
    more: 'Venus is the hottest planet in our solar system with surface temps over 450°C.'
  },
  {
    name: 'Earth',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
    description: 'Our home planet.',
    more: 'Earth is the only known planet with liquid water on its surface and life.'
  },
  {
    name: 'Mars',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
    description: 'Known as the Red Planet.',
    more: 'Mars has the tallest volcano and the deepest canyon in the solar system.'
  },
  {
    name: 'Jupiter',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg',
    description: 'Largest planet in our solar system.',
    more: 'Jupiter has 79 moons and a giant red storm raging for centuries.'
  },
  {
    name: 'Saturn',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
    description: 'Famous for its rings.',
    more: 'Saturn’s rings are made of billions of particles, from tiny dust grains to mountains.'
  },
  {
    name: 'Uranus',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
    description: 'A tilted planet with a bluish hue.',
    more: 'Uranus orbits the Sun on its side, making its seasons last 21 Earth years.'
  },
  {
    name: 'Neptune',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg',
    description: 'Deep blue and very windy.',
    more: 'Neptune has supersonic winds — the fastest in the solar system.'
  },
  {
    name: 'Pluto (Dwarf Planet)',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Nh-pluto-in-true-color_2x_JPEG-edit-frame.jpg',
    description: 'Former 9th planet, now a dwarf.',
    more: 'Pluto has five known moons and a heart-shaped ice region on its surface.'
  },
];

const Planets = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const handleCardClick = (planet) => {
    setSelectedPlanet(planet);
    onOpen();
  };

  return (
    <Box p={6}>
      <Heading mb={6}>🪐 Explore the Planets</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {planets.map((planet) => (
          <Card
            key={planet.name}
            bg="gray.700"
            color="white"
            borderRadius="xl"
            cursor="pointer"
            _hover={{ transform: 'scale(1.02)', boxShadow: 'xl' }}
            transition="all 0.2s"
            onClick={() => handleCardClick(planet)}
          >
            <CardBody>
              <Image
                src={planet.image}
                alt={planet.name}
                borderRadius="lg"
                mb={4}
                h="200px"
                w="100%"
                objectFit="cover"
              />
              <Heading size="md" mb={2}>{planet.name}</Heading>
              <Text>{planet.description}</Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal */}
      {selectedPlanet && (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader>{selectedPlanet.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Image
                src={selectedPlanet.image}
                alt={selectedPlanet.name}
                borderRadius="md"
                mb={4}
                h="250px"
                w="100%"
                objectFit="cover"
              />
              <Text mb={3}><strong>Overview:</strong> {selectedPlanet.description}</Text>
              <Text><strong>Details:</strong> {selectedPlanet.more}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Planets;
