import { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  Select,
  FormControl,
  FormLabel,
  useColorModeValue,
  Box,
} from '@chakra-ui/react'
import { Language } from '../types/language'

interface LevelSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  language: Language
  onStartLearning: (currentLevel: string, targetLevel: string) => void
}

const levels = [
  { value: 'beginner', label: 'Beginner - No prior knowledge' },
  { value: 'elementary', label: 'Elementary - Basic conversations' },
  { value: 'intermediate', label: 'Intermediate - Can express most ideas' },
  { value: 'advanced', label: 'Advanced - Fluent in most situations' },
  { value: 'native', label: 'Native/Bilingual - Complete fluency' },
]

const LevelSelectionModal = ({
  isOpen,
  onClose,
  language,
  onStartLearning,
}: LevelSelectionModalProps) => {
  const [currentLevel, setCurrentLevel] = useState('beginner')
  const [targetLevel, setTargetLevel] = useState('intermediate')
  const bgColor = useColorModeValue('white', 'gray.800')

  const handleSubmit = () => {
    onStartLearning(currentLevel, targetLevel)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent bg={bgColor}>
        <ModalHeader>
          <Text fontSize="2xl">
            Start Learning {language.name}
            <Text as="span" color="blue.500" ml={2}>
              {language.nativeName}
            </Text>
          </Text>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={6}>
            <Text color="gray.600">
              To personalize your learning experience, please tell us about your
              current proficiency level and your learning goals.
            </Text>

            <FormControl>
              <FormLabel>Your Current Level</FormLabel>
              <Select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Your Target Level</FormLabel>
              <Select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
              >
                {levels
                  .filter((level) => {
                    const currentIdx = levels.findIndex((l) => l.value === currentLevel)
                    const levelIdx = levels.findIndex((l) => l.value === level.value)
                    return levelIdx > currentIdx
                  })
                  .map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
              </Select>
            </FormControl>

            <Box w="full" p={4} bg="blue.50" borderRadius="md">
              <Text fontSize="sm" color="blue.700">
                Based on your selection, we'll customize the lesson plan and
                learning materials to help you progress from{' '}
                <Text as="span" fontWeight="bold">
                  {levels.find((l) => l.value === currentLevel)?.label}
                </Text>{' '}
                to{' '}
                <Text as="span" fontWeight="bold">
                  {levels.find((l) => l.value === targetLevel)?.label}
                </Text>
                .
              </Text>
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Start Learning
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LevelSelectionModal 