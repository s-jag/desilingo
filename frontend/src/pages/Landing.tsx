import { Box, Button, Container, Heading, Text, VStack, HStack, Image, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Landing = () => {
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box>
      {/* Navigation */}
      <Box bg={bgColor} py={4} px={8} boxShadow="sm">
        <Container maxW="container.xl">
          <HStack justify="space-between">
            <Heading size="md" color="brand.600">DesiLingo</Heading>
            <HStack spacing={4}>
              <Button as={RouterLink} to="/login" variant="ghost">
                Login
              </Button>
              <Button as={RouterLink} to="/login" colorScheme="blue">
                Get Started
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={8} align="center" textAlign="center">
          <Heading size="2xl" color="brand.700">
            Learn Indian Languages the Fun Way
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="2xl">
            Master Hindi, Tamil, Telugu, and more through interactive lessons, games, and real-world conversations.
          </Text>
          <HStack spacing={4}>
            <Button
              as={RouterLink}
              to="/login"
              size="lg"
              colorScheme="blue"
              px={8}
            >
              Start Learning Free
            </Button>
            <Button
              as={RouterLink}
              to="/about"
              size="lg"
              variant="outline"
              px={8}
            >
              Learn More
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Features Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <Heading size="xl" color="brand.700">
              Why Choose DesiLingo?
            </Heading>
            <HStack spacing={8} align="start">
              <VStack
                bg={bgColor}
                p={8}
                rounded="lg"
                boxShadow="md"
                flex={1}
                align="start"
              >
                <Heading size="md">Interactive Learning</Heading>
                <Text color="gray.600">
                  Engage with fun exercises, quizzes, and games designed to make learning enjoyable.
                </Text>
              </VStack>
              <VStack
                bg={bgColor}
                p={8}
                rounded="lg"
                boxShadow="md"
                flex={1}
                align="start"
              >
                <Heading size="md">Native Speakers</Heading>
                <Text color="gray.600">
                  Learn from authentic pronunciations and real-world conversations.
                </Text>
              </VStack>
              <VStack
                bg={bgColor}
                p={8}
                rounded="lg"
                boxShadow="md"
                flex={1}
                align="start"
              >
                <Heading size="md">Track Progress</Heading>
                <Text color="gray.600">
                  Monitor your learning journey with detailed progress tracking and achievements.
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

export default Landing 