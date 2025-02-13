import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Text,
  Link,
  useToast,
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement actual login logic here
      console.log('Login attempt with:', { email, password })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Login successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      
      navigate('/dashboard')
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container maxW="container.sm" py={20}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={3} align="center">
          <Heading size="xl">Welcome Back</Heading>
          <Text color="gray.600">
            Continue your language learning journey
          </Text>
        </VStack>

        <Box
          as="form"
          onSubmit={handleSubmit}
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
        >
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </VStack>
        </Box>

        <Text textAlign="center">
          Don't have an account?{' '}
          <Link as={RouterLink} to="/signup" color="blue.500">
            Sign up
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default Login 