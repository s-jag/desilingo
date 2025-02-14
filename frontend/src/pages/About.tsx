import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Flex,
  Image,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { FaGraduationCap, FaUsers, FaChartLine, FaCheck } from 'react-icons/fa'

const About = () => {
  const features = [
    {
      icon: FaGraduationCap,
      title: 'Scientific Learning Method',
      description: 'Our curriculum is designed based on proven language acquisition methodologies and spaced repetition techniques.',
    },
    {
      icon: FaUsers,
      title: 'Native Speaker Input',
      description: 'All our content is created and verified by native speakers to ensure authenticity and accuracy.',
    },
    {
      icon: FaChartLine,
      title: 'Adaptive Learning',
      description: 'Our platform adjusts to your learning pace and style, providing personalized lessons and practice sessions.',
    },
  ]

  const methodologyPoints = [
    'Interactive lessons with immediate feedback',
    'Progressive difficulty levels',
    'Cultural context integration',
    'Regular practice exercises',
    'Speech recognition for pronunciation',
    'Gamified learning experience',
  ]

  return (
    <Box py={20}>
      {/* Mission Section */}
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <VStack spacing={6} textAlign="center" maxW="800px">
            <Heading size="2xl" color="brand.700">
              Connecting India Through Language
            </Heading>
            <Text fontSize="xl" color="gray.600">
              DesiLingo is on a mission to break language barriers across India by making language learning accessible, 
              enjoyable, and effective for everyone.
            </Text>
          </VStack>

          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
            {features.map((feature, index) => (
              <Box
                key={index}
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
              >
                <Icon as={feature.icon} w={10} h={10} color="blue.500" mb={4} />
                <Heading size="md" mb={4}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.description}</Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* Methodology Section */}
          <Box bg="gray.50" w="full" py={16}>
            <Container maxW="container.xl">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <VStack align="start" spacing={6}>
                  <Heading size="xl" color="brand.700">
                    Our Learning Methodology
                  </Heading>
                  <Text color="gray.600" fontSize="lg">
                    We combine traditional language learning techniques with modern technology 
                    to create an engaging and effective learning experience.
                  </Text>
                  <List spacing={3}>
                    {methodologyPoints.map((point, index) => (
                      <ListItem key={index} display="flex" alignItems="center">
                        <ListIcon as={FaCheck} color="green.500" />
                        <Text>{point}</Text>
                      </ListItem>
                    ))}
                  </List>
                </VStack>
                <Flex justify="center" align="center">
                  <Image
                    src="/images/methodology.svg"
                    alt="Learning Methodology"
                    maxW="400px"
                    fallbackSrc="https://via.placeholder.com/400x300"
                  />
                </Flex>
              </SimpleGrid>
            </Container>
          </Box>

          {/* Impact Section */}
          <VStack spacing={6} textAlign="center" maxW="800px">
            <Heading size="xl" color="brand.700">
              Our Impact
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Since our launch, we've helped thousands of learners connect with different 
              Indian cultures through language learning. Our community includes students, 
              professionals, and enthusiasts from all walks of life.
            </Text>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10} width="full" mt={8}>
              <StatBox number="1+" label="Active Learners" />
              <StatBox number="5+" label="Indian Languages" />
              <StatBox number="1+" label="Lessons Completed" />
              <StatBox number="98%" label="Satisfaction Rate" />
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

const StatBox = ({ number, label }: { number: string; label: string }) => (
  <Box textAlign="center">
    <Text fontSize="3xl" fontWeight="bold" color="blue.500">
      {number}
    </Text>
    <Text color="gray.600">{label}</Text>
  </Box>
)

export default About 