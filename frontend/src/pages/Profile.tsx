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
} from '@chakra-ui/react'
import { useState } from 'react'

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    nativeLanguage: 'English',
    learningGoal: 'Intermediate',
    dailyGoal: '30',
  })

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false)
  }

  const stats = [
    { label: 'Days Streak', value: '15' },
    { label: 'Total XP', value: '2,450' },
    { label: 'Lessons Completed', value: '48' },
    { label: 'Hours Practiced', value: '24' },
  ]

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Profile Header */}
        <Box textAlign="center">
          <Avatar size="2xl" name={userData.name} mb={4} />
          <Heading size="lg">{userData.name}</Heading>
          <Text color="gray.600">{userData.email}</Text>
        </Box>

        <Divider />

        {/* Statistics */}
        <Box>
          <Heading size="md" mb={4}>Your Progress</Heading>
          <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            {stats.map((stat) => (
              <GridItem
                key={stat.label}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="sm"
                textAlign="center"
              >
                <Text fontSize="3xl" fontWeight="bold" color="blue.500">
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
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                isReadOnly={!isEditing}
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