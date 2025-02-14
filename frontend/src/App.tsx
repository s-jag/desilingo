import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { AuthProvider } from './auth/AuthProvider'
import { ProtectedRoute } from './auth/ProtectedRoute'
import ProtectedLayout from './components/ProtectedLayout'

// Pages
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import About from './pages/About'
import Lesson from './pages/Lesson'
import LanguageSelection from './pages/LanguageSelection'

function App() {
  return (
    <AuthProvider>
      <Box minH="100vh">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Profile />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/languages"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <LanguageSelection />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/:lessonId"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Lesson />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </AuthProvider>
  )
}

export default App 