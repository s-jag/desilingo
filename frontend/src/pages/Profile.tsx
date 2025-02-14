import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface UserStats {
  daysStreak: number;
  totalXP: number;
  lessonsCompleted: number;
  totalHoursSpent: number;
  lastWeekHours: number;
  averageDailyMinutes: number;
}

const API_URL = 'http://localhost:3000'

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const toast = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    nativeLanguage: 'English',
    learningGoal: 'Intermediate',
    dailyGoal: '30',
  })
  const [stats, setStats] = useState<UserStats>({
    daysStreak: 0,
    totalXP: 0,
    lessonsCompleted: 0,
    totalHoursSpent: 0,
    lastWeekHours: 0,
    averageDailyMinutes: 0,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        const token = await getAccessTokenSilently()
        
        // Initialize user data with Auth0 data
        setUserData(prev => ({
          ...prev,
          name: user?.name || '',
          email: user?.email || '',
        }))

        // Fetch user profile data
        const profileResponse = await fetch(`${API_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (!profileResponse.ok) {
          const errorData = await profileResponse.json()
          throw new Error(errorData.error || 'Failed to fetch profile data')
        }

        const profileData = await profileResponse.json()
        
        // Update user data with database values
        setUserData({
          name: profileData.name || user?.name || '',
          email: user?.email || profileData.email || '',
          nativeLanguage: profileData.native_language || 'English',
          learningGoal: profileData.learning_goal || 'Intermediate',
          dailyGoal: (profileData.daily_goal || 30).toString(),
        })

        // Fetch user statistics
        const statsResponse = await fetch(`${API_URL}/api/user/stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!statsResponse.ok) {
          const errorData = await statsResponse.json()
          throw new Error(errorData.error || 'Failed to fetch statistics')
        }

        const statsData = await statsResponse.json()
        setStats({
          daysStreak: statsData.daysStreak || 0,
          totalXP: statsData.totalXP || 0,
          lessonsCompleted: statsData.lessonsCompleted || 0,
          totalHoursSpent: statsData.totalHoursSpent || 0,
          lastWeekHours: statsData.lastWeekHours || 0,
          averageDailyMinutes: statsData.averageDailyMinutes || 0,
        })
      } catch (error: any) {
        console.error('Error fetching user data:', error)
        toast({
          title: 'Error fetching profile',
          description: error.message || 'There was an error loading your profile data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (isAuthenticated && user?.sub) {
      fetchUserData()
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, getAccessTokenSilently, user, toast])

  const handleSave = async () => {
    try {
      setIsSaving(true)
      const token = await getAccessTokenSilently()
      const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: userData.name,
          nativeLanguage: userData.nativeLanguage,
          learningGoal: userData.learningGoal,
          dailyGoal: userData.dailyGoal
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      const updatedProfile = await response.json()
      setUserData(prev => ({
        ...prev,
        name: updatedProfile.name,
        nativeLanguage: updatedProfile.native_language,
        learningGoal: updatedProfile.learning_goal,
        dailyGoal: updatedProfile.daily_goal.toString()
      }))

      setIsEditing(false)
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error updating profile',
        description: error.message || 'There was an error saving your profile data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <Container maxW="container.lg" py={8}>
        <Text>Please log in to view your profile.</Text>
      </Container>
    )
  }

  if (isLoading) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={4}>
          <Spinner size="xl" />
          <Text>Loading profile...</Text>
        </VStack>
      </Container>
    )
  }

  const statItems = [
    { label: 'Days Streak', value: stats.daysStreak.toString() },
    { label: 'Total XP', value: stats.totalXP.toLocaleString() },
    { label: 'Lessons Completed', value: stats.lessonsCompleted.toString() },
    { label: 'Total Hours', value: stats.totalHoursSpent.toString() },
    { label: 'Last 7 Days', value: `${stats.lastWeekHours}h` },
    { label: 'Daily Average', value: `${Math.round(stats.averageDailyMinutes)}m` },
  ]

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Box textAlign="center">
          <Avatar size="2xl" name={userData.name} src={user?.picture} mb={4} />
          <Heading size="lg">{userData.name}</Heading>
          <Text color="gray.600">{userData.email}</Text>
        </Box>

        <Divider />

        {/* Statistics */}
        <Box>
          <Heading size="md" mb={4}>Your Progress</Heading>
          <Grid templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(6, 1fr)']} gap={6}>
            {statItems.map((stat) => (
              <GridItem
                key={stat.label}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="sm"
                textAlign="center"
              >
                <Text fontSize={['2xl', '3xl']} fontWeight="bold" color="blue.500">
                  {stat.value}
                </Text>
                <Text color="gray.600">{stat.label}</Text>
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* Profile Settings */}
        <Box>
          <Stack
            direction="row"
            justify="space-between"
            align="center"
            mb={4}
          >
            <Heading size="md">Profile Settings</Heading>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              colorScheme="blue"
              isLoading={isSaving}
              loadingText="Saving..."
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </Stack>

          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={userData.email}
                isReadOnly={true}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Native Language</FormLabel>
              <Select
                value={userData.nativeLanguage}
                onChange={(e) =>
                  setUserData({ ...userData, nativeLanguage: e.target.value })
                }
                isDisabled={!isEditing}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Learning Goal</FormLabel>
              <Select
                value={userData.learningGoal}
                onChange={(e) =>
                  setUserData({ ...userData, learningGoal: e.target.value })
                }
                isDisabled={!isEditing}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Daily Goal (minutes)</FormLabel>
              <Select
                value={userData.dailyGoal}
                onChange={(e) =>
                  setUserData({ ...userData, dailyGoal: e.target.value })
                }
                isDisabled={!isEditing}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </Select>
            </FormControl>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Profile 