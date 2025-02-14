import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Navbar from './Navbar'

interface ProtectedLayoutProps {
  children: ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <Box>
      <Navbar />
      <Box pt="64px">
        {children}
      </Box>
    </Box>
  )
}

export default ProtectedLayout 