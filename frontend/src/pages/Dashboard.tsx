import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Progress,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { MotionBox } from '../components/motion'

const Dashboard = () => {
  const navigate = useNavigate()
  const bgColor = useColorModeValue('white', 'gray.800')

  const languages = [
    { name: 'Hindi', progress: 65, level: 'Intermediate' },
    { name: 'Tamil', progress: 30, level: 'Beginner' },
    { name: 'Telugu', progress: 45, level: 'Intermediate' },
  ]

  const dailyGoals = [
    { name: 'Complete 3 Lessons', completed: 2, total: 3 },
    { name: 'Practice Speaking', completed: 1, total: 1 },
    { name: 'Review Vocabulary', completed: 0, total: 1 },
  ]

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Header Section */}
          <VStack align="flex-start" spacing={2}>
            <Heading size="xl">Your Dashboard</Heading>
            <Text color="gray.600">Track your progress and continue learning</Text>
          </VStack>

          {/* New Language Button */}
          <Box>
            <Button
              leftIcon={<Icon as={FaPlus} />}
              colorScheme="blue"
              size="lg"
              onClick={() => navigate('/languages')}
              variant="outline"
              w={{ base: 'full', md: 'auto' }}
            >
              Learn a New Language
            </Button>
          </Box>

          {/* Current Languages Section */}
          <Box>
            <Heading size="md" mb={4}>Your Languages</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {languages.map((lang) => (
                <GridItem
                  key={lang.name}
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between">
                      <Heading size="md">{lang.name}</Heading>
                      <Badge colorScheme="blue">{lang.level}</Badge>
                    </HStack>
                    <Box>
                      <Text mb={2}>Progress</Text>
                      <Progress value={lang.progress} colorScheme="blue" />
                      <Text mt={2} fontSize="sm" color="gray.600">
                        {lang.progress}% Complete
                      </Text>
                    </Box>
                    <Button colorScheme="blue" variant="outline">
                      Continue Learning
                    </Button>
                  </VStack>
                </GridItem>
              ))}
            </SimpleGrid>
          </Box>

          {/* Daily Goals Section */}
          <Box>
            <Heading size="md" mb={4}>Daily Goals</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {dailyGoals.map((goal) => (
                <GridItem
                  key={goal.name}
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="gray.200"
                >
                  <VStack align="stretch" spacing={3}>
                    <Text fontWeight="bold">{goal.name}</Text>
                    <Progress
                      value={(goal.completed / goal.total) * 100}
                      colorScheme={goal.completed === goal.total ? 'green' : 'blue'}
                    />
                    <Text fontSize="sm" color="gray.600">
                      {goal.completed} of {goal.total} completed
                    </Text>
                  </VStack>
                </GridItem>
              ))}
            </SimpleGrid>
          </Box>

          {/* Quick Actions */}
          <Box>
            <Heading size="md" mb={4}>Quick Actions</Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              <Button colorScheme="blue" size="lg">
                Start New Lesson
              </Button>
              <Button colorScheme="green" size="lg">
                Practice Speaking
              </Button>
              <Button colorScheme="purple" size="lg">
                Review Vocabulary
              </Button>
              <Button colorScheme="orange" size="lg">
                Take a Quiz
              </Button>
            </Grid>
          </Box>

          {/* Recent Activity Section */}
          <Box>
            <Heading size="md" mb={4}>Recent Activity</Heading>
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Text color="gray.600">No recent activity</Text>
            </Box>
          </Box>

          {/* Stats Section */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <VStack align="flex-start">
                <Text color="gray.600">Daily Streak</Text>
                <Heading size="xl">0 days</Heading>
              </VStack>
            </Box>
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <VStack align="flex-start">
                <Text color="gray.600">Total XP</Text>
                <Heading size="xl">0 XP</Heading>
              </VStack>
            </Box>
            <Box
              bg={bgColor}
              p={6}
              borderRadius="lg"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <VStack align="flex-start">
                <Text color="gray.600">Lessons Completed</Text>
                <Heading size="xl">0</Heading>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Dashboard 