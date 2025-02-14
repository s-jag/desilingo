import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import About from './pages/About'
import Lesson from './pages/Lesson'

function App() {
  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/lesson/:lessonId" element={<Lesson />} />
      </Routes>
    </Box>
  )
}

export default App 