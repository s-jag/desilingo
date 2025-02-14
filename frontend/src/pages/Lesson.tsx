import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Progress,
  Icon,
  useToast,
  Image,
  Heading,
  Flex,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  IconButton,
} from '@chakra-ui/react'
import { FaVolumeUp, FaCheck, FaTimes, FaArrowRight } from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'

interface LessonContent {
  type: 'text' | 'audio' | 'video' | 'quiz'
  content: string
  options?: string[]
  correctAnswer?: string
  mediaUrl?: string
}

const Lesson = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hearts, setHearts] = useState(5)
  const [progress, setProgress] = useState(0)

  // Mock lesson data (replace with API call)
  const lessonContent: LessonContent[] = [
    {
      type: 'text',
      content: 'Welcome to your Hindi lesson! Let\'s learn some basic greetings.',
    },
    {
      type: 'text',
      content: 'नमस्ते (Namaste) is a formal greeting that can be used at any time of day.',
    },
    {
      type: 'audio',
      content: 'Listen and repeat: नमस्ते (Namaste)',
      mediaUrl: '/audio/namaste.mp3',
    },
    {
      type: 'quiz',
      content: 'What does "नमस्ते" mean?',
      options: ['Hello/Greetings', 'Goodbye', 'Thank you', 'Please'],
      correctAnswer: 'Hello/Greetings',
    },
    {
      type: 'text',
      content: 'शुभ प्रभात (Shubh Prabhat) means "Good Morning" - use this greeting in the morning.',
    },
    {
      type: 'audio',
      content: 'Listen and repeat: शुभ प्रभात (Shubh Prabhat)',
      mediaUrl: '/audio/shubh-prabhat.mp3',
    },
    {
      type: 'quiz',
      content: 'When should you use शुभ प्रभात (Shubh Prabhat)?',
      options: ['In the evening', 'In the morning', 'At night', 'In the afternoon'],
      correctAnswer: 'In the morning',
    },
    {
      type: 'text',
      content: 'शुभ रात्रि (Shubh Ratri) means "Good Night" - use this when saying goodbye at night.',
    },
    {
      type: 'audio',
      content: 'Listen and repeat: शुभ रात्रि (Shubh Ratri)',
      mediaUrl: '/audio/shubh-ratri.mp3',
    },
    {
      type: 'quiz',
      content: 'Match the correct meaning: शुभ रात्रि (Shubh Ratri)',
      options: ['Good Morning', 'Good Afternoon', 'Good Evening', 'Good Night'],
      correctAnswer: 'Good Night',
    },
    {
      type: 'text',
      content: 'धन्यवाद (Dhanyavaad) means "Thank you" - a polite expression of gratitude.',
    },
    {
      type: 'audio',
      content: 'Listen and repeat: धन्यवाद (Dhanyavaad)',
      mediaUrl: '/audio/dhanyavaad.mp3',
    },
    {
      type: 'quiz',
      content: 'What is the meaning of धन्यवाद (Dhanyavaad)?',
      options: ['Hello', 'Please', 'Thank you', 'Sorry'],
      correctAnswer: 'Thank you',
    }
  ]

  const playAudio = (url: string) => {
    const audio = new Audio(url)
    audio.play()
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    const current = lessonContent[currentStep]
    
    if (current.type === 'quiz') {
      const isAnswerCorrect = answer === current.correctAnswer
      setIsCorrect(isAnswerCorrect)
      
      if (!isAnswerCorrect) {
        setHearts(prev => prev - 1)
        if (hearts <= 1) {
          toast({
            title: 'Lesson Failed',
            description: 'You ran out of hearts. Try again!',
            status: 'error',
            duration: 3000,
          })
          navigate('/dashboard')
        }
      }
    }
  }

  const handleNext = () => {
    if (currentStep < lessonContent.length - 1) {
      setCurrentStep(prev => prev + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setProgress((currentStep + 1) * (100 / lessonContent.length))
    } else {
      toast({
        title: 'Lesson Completed!',
        description: 'Great job! You completed this lesson.',
        status: 'success',
        duration: 3000,
      })
      navigate('/dashboard')
    }
  }

  const renderContent = () => {
    const current = lessonContent[currentStep]

    switch (current.type) {
      case 'text':
        return (
          <Card width="full" variant="outline">
            <CardBody>
              <VStack spacing={4}>
                <Text fontSize="xl">{current.content}</Text>
                <Button
                  colorScheme="blue"
                  rightIcon={<Icon as={FaArrowRight} />}
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </VStack>
            </CardBody>
          </Card>
        )

      case 'audio':
        return (
          <Card width="full" variant="outline">
            <CardBody>
              <VStack spacing={4}>
                <Text fontSize="xl">{current.content}</Text>
                <IconButton
                  aria-label="Play pronunciation"
                  icon={<Icon as={FaVolumeUp} />}
                  size="lg"
                  colorScheme="blue"
                  onClick={() => current.mediaUrl && playAudio(current.mediaUrl)}
                />
                <Button
                  colorScheme="blue"
                  rightIcon={<Icon as={FaArrowRight} />}
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </VStack>
            </CardBody>
          </Card>
        )

      case 'quiz':
        return (
          <Card width="full" variant="outline">
            <CardBody>
              <VStack spacing={6}>
                <Text fontSize="xl" fontWeight="bold">
                  {current.content}
                </Text>
                <SimpleGrid columns={2} spacing={4} width="full">
                  {current.options?.map((option) => (
                    <Button
                      key={option}
                      size="lg"
                      variant={selectedAnswer === option ? 'solid' : 'outline'}
                      colorScheme={
                        selectedAnswer === option
                          ? isCorrect
                            ? 'green'
                            : 'red'
                          : 'blue'
                      }
                      onClick={() => handleAnswer(option)}
                      isDisabled={selectedAnswer !== null}
                    >
                      {option}
                    </Button>
                  ))}
                </SimpleGrid>
                {selectedAnswer && (
                  <Button
                    colorScheme="blue"
                    rightIcon={<Icon as={FaArrowRight} />}
                    onClick={handleNext}
                  >
                    Continue
                  </Button>
                )}
              </VStack>
            </CardBody>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <Container maxW="container.md">
        <VStack spacing={8}>
          {/* Header */}
          <HStack width="full" justify="space-between">
            <HStack>
              {[...Array(hearts)].map((_, i) => (
                <Text key={i} fontSize="2xl">
                  ❤️
                </Text>
              ))}
            </HStack>
            <Progress
              value={progress}
              size="sm"
              colorScheme="blue"
              width="50%"
              borderRadius="full"
            />
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => navigate('/dashboard')}
            >
              Exit
            </Button>
          </HStack>

          {/* Main Content */}
          {renderContent()}
        </VStack>
      </Container>
    </Box>
  )
}

export default Lesson 