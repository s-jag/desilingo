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
import { FaPlus, FaBook, FaMicrophone, FaList, FaPuzzlePiece } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion, Variants } from 'framer-motion'
import { MotionBox } from '../components/motion'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const progressVariants: Variants = {
  hidden: { width: 0 },
  visible: (value: number) => ({
    width: `${value}%`,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
}

const Dashboard = () => {
  const navigate = useNavigate()
  const bgColor = useColorModeValue('white', 'gray.800')

  const languages = [
    { name: 'Hindi', progress: 65, level: 'Intermediate' },
    { name: 'Tamil', progress: 30, level: 'Beginner' },
    { name: 'Telugu', progress: 45, level: 'Intermediate' },
  ]

  const dailyGoals = [
    { name: 'Complete 3 Lessons', completed: 2, total: 3, icon: FaBook },
    { name: 'Practice Speaking', completed: 1, total: 1, icon: FaMicrophone },
    { name: 'Review Vocabulary', completed: 0, total: 1, icon: FaList },
  ]

  return (
    <Box py={8}>
      <Container maxW="container.xl">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          as={VStack}
          spacing={8}
          align="stretch"
        >
          {/* Header Section */}
          <MotionBox variants={itemVariants}>
            <VStack align="flex-start" spacing={2}>
              <Heading size="xl">Your Dashboard</Heading>
              <Text color="gray.600">Track your progress and continue learning</Text>
            </VStack>
          </MotionBox>

          {/* New Language Button */}
          <MotionBox variants={itemVariants}>
            <Button
              leftIcon={<Icon as={FaPlus} />}
              colorScheme="blue"
              size="lg"
              onClick={() => navigate('/languages')}
              variant="outline"
              w={{ base: 'full', md: 'auto' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              as={motion.button}
            >
              Learn a New Language
            </Button>
          </MotionBox>

          {/* Current Languages Section */}
          <MotionBox variants={itemVariants}>
            <Heading size="md" mb={4}>Your Languages</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {languages.map((lang, index) => (
                <MotionBox
                  key={lang.name}
                  variants={itemVariants}
                  custom={index}
                  as={GridItem}
                  bg="white"
                  p={6}
                  borderRadius="lg"
                  boxShadow="sm"
                  whileHover={{ y: -4, boxShadow: "lg" }}
                  transition={{ duration: 0.2 }}
                >
                  <VStack align="stretch" spacing={4}>
                    <HStack justify="space-between">
                      <Heading size="md">{lang.name}</Heading>
                      <Badge colorScheme="blue">{lang.level}</Badge>
                    </HStack>
                    <Box>
                      <Text mb={2}>Progress</Text>
                      <Box h="8px" bg="gray.100" borderRadius="full" overflow="hidden">
                        <MotionBox
                          h="100%"
                          bg="blue.500"
                          variants={progressVariants}
                          custom={lang.progress}
                          initial="hidden"
                          animate="visible"
                        />
                      </Box>
                      <Text mt={2} fontSize="sm" color="gray.600">
                        {lang.progress}% Complete
                      </Text>
                    </Box>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      as={motion.button}
                    >
                      Continue Learning
                    </Button>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Daily Goals Section */}
          <MotionBox variants={itemVariants}>
            <Heading size="md" mb={4}>Daily Goals</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {dailyGoals.map((goal, index) => (
                <MotionBox
                  key={goal.name}
                  variants={itemVariants}
                  custom={index}
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="gray.200"
                  whileHover={{ scale: 1.02, boxShadow: "md" }}
                >
                  <VStack align="stretch" spacing={3}>
                    <HStack spacing={3}>
                      <Icon as={goal.icon} color="blue.500" boxSize={5} />
                      <Text fontWeight="bold">{goal.name}</Text>
                    </HStack>
                    <Box h="8px" bg="gray.100" borderRadius="full" overflow="hidden">
                      <MotionBox
                        h="100%"
                        bg={goal.completed === goal.total ? "green.500" : "blue.500"}
                        variants={progressVariants}
                        custom={(goal.completed / goal.total) * 100}
                        initial="hidden"
                        animate="visible"
                      />
                    </Box>
                    <Text fontSize="sm" color="gray.600">
                      {goal.completed} of {goal.total} completed
                    </Text>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Quick Actions */}
          <MotionBox variants={itemVariants}>
            <Heading size="md" mb={4}>Quick Actions</Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4}>
              {[
                { text: 'Start New Lesson', icon: FaBook, color: 'blue' },
                { text: 'Practice Speaking', icon: FaMicrophone, color: 'green' },
                { text: 'Review Vocabulary', icon: FaList, color: 'purple' },
                { text: 'Take a Quiz', icon: FaPuzzlePiece, color: 'orange' },
              ].map((action, index) => (
                <MotionBox
                  key={action.text}
                  as={Button}
                  leftIcon={<Icon as={action.icon} />}
                  colorScheme={action.color}
                  size="lg"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action.text}
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          {/* Stats Section */}
          <MotionBox variants={itemVariants}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {[
                { label: 'Daily Streak', value: '7 days' },
                { label: 'Total XP', value: '1,234 XP' },
                { label: 'Lessons Completed', value: '42' },
              ].map((stat, index) => (
                <MotionBox
                  key={stat.label}
                  variants={itemVariants}
                  custom={index}
                  bg={bgColor}
                  p={6}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor="gray.200"
                  whileHover={{ scale: 1.05, boxShadow: "lg" }}
                >
                  <VStack align="flex-start">
                    <Text color="gray.600">{stat.label}</Text>
                    <Heading size="xl">{stat.value}</Heading>
                  </VStack>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default Dashboard 