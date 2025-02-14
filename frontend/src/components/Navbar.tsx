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
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
  const { user, logout } = useAuth0()
  const location = useLocation()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

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
            to="/dashboard"
            fontSize="xl"
            fontWeight="bold"
            color="brand.600"
          >
            DesiLingo
          </Text>

          {/* Desktop Navigation */}
          <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
            <Button
              as={RouterLink}
              to="/dashboard"
              variant={isActive('/dashboard') ? 'solid' : 'ghost'}
              colorScheme={isActive('/dashboard') ? 'blue' : 'gray'}
            >
              Dashboard
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
    </Box>
  )
}

export default Navbar 