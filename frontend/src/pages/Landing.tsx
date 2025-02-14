import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Badge,
} from '@chakra-ui/react'
import { Variants } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { FaBook, FaGamepad, FaMobile, FaUsers } from 'react-icons/fa'
import {
  MotionBox,
  MotionFlex,
  MotionText,
  MotionButton,
} from '../components/motion'
import heroIllustration from '../assets/hero-illustration.svg'

interface FeatureCardProps {
  icon: React.ComponentType
  title: string
  description: string
  delay: number
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 }
}

const buttonVariants: Variants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <MotionBox
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      p={6}
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
        borderColor: 'blue.400',
      }}
      style={{ transition: 'all 0.3s' }}
    >
      <VStack spacing={4} align="flex-start">
        <Icon as={icon} boxSize={10} color="blue.500" />
        <Heading size="md">{title}</Heading>
        <Text color="gray.600">{description}</Text>
      </VStack>
    </MotionBox>
  )
}

const Landing = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const bgGradient = useColorModeValue(
    'linear(to-b, blue.50, white)',
    'linear(to-b, gray.900, gray.800)'
  )

  const handleSignup = () => {
    loginWithRedirect({
      appState: { returnTo: '/dashboard' },
    })
  }

  const features = [
    {
      icon: FaBook,
      title: 'Bite-Sized Lessons',
      description: 'Master vocabulary and grammar in just a few minutes a day.',
    },
    {
      icon: FaGamepad,
      title: 'Fun & Interactive',
      description: 'Boost your motivation with quizzes, streaks, and friendly challenges.',
    },
    {
      icon: FaMobile,
      title: 'Anytime, Anywhere',
      description: 'Learn at your own pace on the web, with mobile apps coming soon.',
    },
    {
      icon: FaUsers,
      title: 'Join a Community',
      description: 'Practice alongside learners and native speakers who support your journey.',
    },
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={bgGradient}
        minH="100vh"
        py={20}
        display="flex"
        alignItems="center"
      >
        <Container maxW="container.xl">
          <MotionFlex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            justify="space-between"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <VStack
              align={{ base: 'center', lg: 'flex-start' }}
              spacing={8}
              maxW={{ base: 'full', lg: '50%' }}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              <Badge
                colorScheme="blue"
                fontSize="md"
                px={4}
                py={2}
                borderRadius="full"
              >
                Now in Beta
              </Badge>
              <MotionBox
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Heading
                  size="2xl"
                  color="brand.700"
                  lineHeight="shorter"
                >
                  Learn Indian Languages for Free — Quickly, Easily, and Enjoyably
                </Heading>
              </MotionBox>
              <MotionText
                fontSize="xl"
                color="gray.600"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                Start your journey to mastering Hindi, Tamil, Telugu, and more through
                interactive lessons and real-world conversations.
              </MotionText>
              <HStack spacing={4}>
                <MotionButton
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  size="lg"
                  colorScheme="blue"
                  onClick={handleSignup}
                  px={8}
                  fontSize="lg"
                >
                  Start Learning Free
                </MotionButton>
                <Box as={RouterLink} to="/about">
                  <MotionButton
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    size="lg"
                    variant="outline"
                    colorScheme="blue"
                    px={8}
                    fontSize="lg"
                  >
                    Learn More
                  </MotionButton>
                </Box>
              </HStack>
            </VStack>
            <MotionBox
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              maxW={{ base: '80%', lg: '45%' }}
              mt={{ base: 12, lg: 0 }}
            >
              <Image
                src={heroIllustration}
                alt="Learning Illustration"
                fallbackSrc="https://via.placeholder.com/500"
                width="full"
                height="auto"
                objectFit="contain"
                loading="eager"
                sx={{
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
                }}
              />
            </MotionBox>
          </MotionFlex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl" color="brand.700">
                Why Choose DesiLingo?
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                Our platform makes learning Indian languages accessible, engaging, and effective.
              </Text>
            </VStack>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={8}
              w="full"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  delay={0.2 * (index + 1)}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        bg={useColorModeValue('blue.50', 'gray.800')}
        py={20}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <MotionBox
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Heading size="xl" color="brand.700">
                Ready to get started?
              </Heading>
              <Text fontSize="lg" color="gray.600" mt={4} maxW="2xl">
                Join thousands of learners who are already experiencing the joy of
                learning Indian languages with DesiLingo.
              </Text>
            </MotionBox>
            <MotionButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              size="lg"
              colorScheme="blue"
              onClick={handleSignup}
              px={12}
              fontSize="lg"
            >
              Sign Up Free
            </MotionButton>
          </VStack>
        </Container>
      </Box>

      {/* Closing Section */}
      <Box py={20}>
        <Container maxW="container.xl">
          <MotionBox
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            textAlign="center"
          >
            <Heading size="lg" color="brand.700" mb={4}>
              For Everyone, Everywhere
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="3xl" mx="auto">
              DesiLingo is designed for everyone—students, travelers, or anyone wanting
              to explore India's linguistic diversity. Begin your language journey with
              us today and see how enjoyable learning can be.
            </Text>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  )
}

export default Landing 