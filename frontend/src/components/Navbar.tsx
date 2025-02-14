import { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Text,
  Avatar,
  Container,
  SlideFade,
  VStack,
  Icon,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { FaFire } from 'react-icons/fa'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)

const StreakNotification = ({ onClose }: { onClose: () => void }) => {
  return (
    <AnimatePresence>
      <MotionBox
        position="fixed"
        right={4}
        top={20}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={onClose}
      >
        <SlideFade in={true}>
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            borderRadius="lg"
            boxShadow="lg"
            p={4}
            maxW="sm"
          >
            <HStack spacing={3} align="center">
              <Icon as={FaFire} color="orange.400" boxSize={6} />
              <VStack align="start" spacing={0}>
                <Text fontWeight="bold">+1 Day Streak!</Text>
                <Text fontSize="sm" color="gray.500">
                  Keep up the great work!
                </Text>
              </VStack>
            </HStack>
          </Box>
        </SlideFade>
      </MotionBox>
    </AnimatePresence>
  )
}

const Navbar = () => {
  const { user, logout } = useAuth0()
  const location = useLocation()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const [showStreak, setShowStreak] = useState(false)

  useEffect(() => {
    // Check if this is the first login of the day
    const lastLoginDate = localStorage.getItem('lastLoginDate')
    const today = new Date().toDateString()

    if (lastLoginDate !== today) {
      localStorage.setItem('lastLoginDate', today)
      setShowStreak(true)

      // Update streak count
      const currentStreak = parseInt(localStorage.getItem('streak') || '0')
      localStorage.setItem('streak', (currentStreak + 1).toString())
    }
  }, [])

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <Box
      bg={bgColor}
      px={4}
      position="fixed"
      top={0}
      left={0}
      right={0}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex={1000}
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Mobile menu button */}
          <IconButton
            size="md"
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
          />

          {/* Logo */}
          <Text
            as={RouterLink}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color="brand.600"
            _hover={{
              transform: 'scale(1.05)',
              transition: 'transform 0.2s'
            }}
          >
            DesiLingo
          </Text>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Button
              as={RouterLink}
              to="/languages"
              variant="ghost"
              colorScheme="blue"
            >
              Learn New Language
            </Button>
          </HStack>

          {/* User Menu */}
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar
                size="sm"
                name={user?.name}
                src={user?.picture}
              />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/dashboard">
                Dashboard
              </MenuItem>
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>

      {/* Streak Notification */}
      {showStreak && (
        <StreakNotification
          onClose={() => {
            setTimeout(() => {
              setShowStreak(false)
            }, 3000)
          }}
        />
      )}
    </Box>
  )
}

export default Navbar 