import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { FaGoogle } from 'react-icons/fa'

const Login = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return <RouterLink to="/dashboard" />
  }

  return (
    <Container maxW="container.sm" py={20}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={3} align="center">
          <Heading size="xl">Welcome to DesiLingo</Heading>
          <Text color="gray.600">
            Continue your language learning journey
          </Text>
        </VStack>

        <Box
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
        >
          <VStack spacing={4}>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="blue"
              size="lg"
              width="full"
              onClick={() => loginWithRedirect()}
            >
              Sign in with Google
            </Button>
          </VStack>
        </Box>

        <Text textAlign="center">
          Don't have an account?{' '}
          <Link as={RouterLink} to="/" color="blue.500">
            Sign up
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default Login 