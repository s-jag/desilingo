import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  useColorModeValue,
  useDisclosure,
  Center,
  Button,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MotionBox } from '../components/motion'
import LevelSelectionModal from '../components/LevelSelectionModal'
import { Language } from '../types/language'
import { FaArrowLeft } from 'react-icons/fa'

const languages: Language[] = [
  {
    id: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    icon: 'ह',
    description: 'The most widely spoken language in India',
  },
  {
    id: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    icon: 'த',
    description: 'Classical language with rich literary tradition',
  },
  {
    id: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    icon: 'తె',
    description: 'Known as the "Italian of the East"',
  },
  {
    id: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    icon: 'ಕ',
    description: 'Ancient language of Karnataka',
  },
  {
    id: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    icon: 'മ',
    description: 'Language of Kerala with unique script',
  },
  {
    id: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    icon: 'ব',
    description: 'Rich poetic and cultural heritage',
  },
]

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: delay * 0.1,
    },
  }),
}

const LanguageCard = ({ language, index, onSelect }: { 
  language: Language
  index: number
  onSelect: (language: Language) => void
}) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const iconBgColor = useColorModeValue('blue.50', 'blue.900')

  return (
    <MotionBox
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      cursor="pointer"
      onClick={() => onSelect(language)}
      p={6}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: 'blue.400',
      }}
      style={{ transition: 'all 0.2s' }}
    >
      <VStack spacing={4} align="flex-start">
        <Center
          bg={iconBgColor}
          w="50px"
          h="50px"
          borderRadius="lg"
          fontSize="2xl"
          color="blue.500"
          fontWeight="bold"
        >
          {language.icon}
        </Center>
        <VStack spacing={1} align="flex-start">
          <Heading size="md">{language.name}</Heading>
          <Text fontSize="xl" color="blue.500" fontWeight="bold">
            {language.nativeName}
          </Text>
          <Text color="gray.600">{language.description}</Text>
        </VStack>
      </VStack>
    </MotionBox>
  )
}

const LanguageSelection = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    onOpen()
  }

  const handleStartLearning = (currentLevel: string, targetLevel: string) => {
    if (selectedLanguage) {
      navigate(`/lesson/intro/${selectedLanguage.id}`, {
        state: { currentLevel, targetLevel }
      })
    }
  }

  return (
    <Box py={12}>
      <Container maxW="container.xl">
        <VStack spacing={12} align="stretch">
          <Box>
            <Button
              leftIcon={<Icon as={FaArrowLeft} />}
              variant="ghost"
              colorScheme="blue"
              onClick={() => navigate('/dashboard')}
              _hover={{
                transform: 'translateX(-4px)',
                transition: 'transform 0.2s'
              }}
            >
              Back to Dashboard
            </Button>
          </Box>

          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color="blue.600">
              Choose Your Language
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl">
              Select the language you want to learn. Each language comes with carefully
              crafted lessons designed for beginners to advanced learners.
            </Text>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
          >
            {languages.map((language, index) => (
              <LanguageCard
                key={language.id}
                language={language}
                index={index}
                onSelect={handleLanguageSelect}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {selectedLanguage && (
        <LevelSelectionModal
          isOpen={isOpen}
          onClose={onClose}
          language={selectedLanguage}
          onStartLearning={handleStartLearning}
        />
      )}
    </Box>
  )
}

export default LanguageSelection 