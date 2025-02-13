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
} from '@chakra-ui/react'

const Dashboard = () => {
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
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="lg" mb={2}>Welcome back!</Heading>
          <Text color="gray.600">Keep up the great work with your language learning journey.</Text>
        </Box>

        {/* Language Progress Section */}
        <Box>
          <Heading size="md" mb={4}>Your Languages</Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
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
          </Grid>
        </Box>

        {/* Daily Goals Section */}
        <Box>
          <Heading size="md" mb={4}>Daily Goals</Heading>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {dailyGoals.map((goal) => (
              <GridItem
                key={goal.name}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="sm"
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
          </Grid>
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
      </VStack>
    </Container>
  )
}

export default Dashboard 