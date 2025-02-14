# DesiLingo - Indian Language Learning Platform

DesiLingo is a modern web application designed to help users learn Indian languages through interactive lessons, quizzes, and real-time progress tracking. The platform supports multiple Indian languages and provides a gamified learning experience.

## 🌟 Features

- Multi-language support (Hindi, Tamil, Telugu, Bengali, Punjabi)
- Interactive lessons with text and audio content
- Progress tracking and achievements
- Quizzes and assessments
- User profile management
- Responsive design for all devices
- Daily streak tracking with animated notifications
- Intuitive navigation with quick access to learning materials
- Dark/light mode support

## 🏗 Technology Stack

### Frontend
- **Framework**: React 18
- **UI Library**: Chakra UI
- **State Management**: React Context API
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Language**: TypeScript

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL 15
- **Cache Layer**: Redis
- **API Style**: RESTful
- **Authentication**: JWT

## 📁 Project Structure

```
desilingo/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── theme/         # Chakra UI theme customization
│   │   └── App.tsx        # Main application component
│   ├── index.html
│   ├── vite.config.ts     # Vite configuration
│   └── package.json
│
├── backend/
│   ├── database/
│   │   ├── schema.sql     # Database schema
│   │   └── seed.sql       # Initial data
│   └── src/               # NestJS application (coming soon)
│
└── docker-compose.yml     # Docker services configuration
```

## 🗄 Database Schema

### Core Tables
1. **users**
   - User authentication and profile information
   - Supports multiple roles (learner, admin, teacher)
   - Tracks creation and update timestamps

2. **languages**
   - Available languages for learning
   - Stores language codes and names

3. **lessons**
   - Course content organized by language and difficulty level
   - Supports levels 1-5 (Beginner to Advanced)
   - Links to specific language content

4. **lesson_contents**
   - Stores various types of lesson content (text, audio, video)
   - Ordered sequence of content blocks
   - Content validation constraints

### Quiz System
1. **quizzes**
   - Linked to specific lessons
   - Assessment tools for learning progress

2. **quiz_questions**
   - Multiple question types (multiple choice, fill in blanks, true/false)
   - Linked to specific quizzes

3. **quiz_options**
   - Answer options for questions
   - Tracks correct answers

### Progress Tracking
1. **user_lessons**
   - Tracks user progress through lessons
   - Status: not_started, in_progress, completed
   - Stores scores and last access time

2. **user_quizzes**
   - Records quiz attempts and scores
   - Tracks best performance

## 🚀 Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ and npm
- Git
- Auth0 account (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/desilingo.git
cd desilingo
```

2. Set up environment variables:

Frontend (.env in frontend directory):
```
VITE_API_URL=http://localhost:3000
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-api-identifier
```

Backend (.env in backend directory):
```
PORT=3000
DATABASE_URL=postgres://desilingo_user:desilingo_password@localhost:5432/desilingo
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain/
AUTH0_AUDIENCE=your-auth0-api-identifier
```

3. Start the database and pgAdmin:
```bash
docker-compose up -d
```

4. Install frontend dependencies:
```bash
cd frontend
npm install
npm run dev
```

### Database Access

#### Direct Connection
- Host: localhost
- Port: 5432
- Database: desilingo
- Username: desilingo_user
- Password: desilingo_password

#### pgAdmin Access
- URL: http://localhost:5050
- Email: admin@desilingo.com
- Password: admin

## 💾 Database Management

### Custom Types
```sql
user_role: 'learner', 'admin', 'teacher'
lesson_status: 'not_started', 'in_progress', 'completed'
content_type: 'text', 'image', 'audio', 'video', 'flashcards'
question_type: 'multiple_choice', 'fill_blank', 'true_false'
```

### Automatic Features
- UUID generation for secure IDs
- Automatic timestamp management (created_at, updated_at)
- Cascading deletes for related records
- Data validation constraints
- Optimized indexes for common queries

## 🔒 Security Features

1. **Password Security**
   - Passwords are hashed using bcrypt
   - Salt rounds: 10
   - Never stored in plain text

2. **Database Security**
   - Isolated network for database connections
   - User-specific permissions
   - Prepared statements for query safety

3. **API Security** (Coming Soon)
   - JWT-based authentication
   - Role-based access control
   - Rate limiting
   - CORS protection

## 🧪 Testing

Coming soon:
- Unit tests
- Integration tests
- E2E tests
- Performance testing

## 📱 Mobile Support

The web application is designed to be fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

Future plans include:
- React Native mobile app
- Offline learning support
- Push notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Chakra UI for the component library
- PostgreSQL team for the amazing database
- The open-source community

## 📞 Contact

For questions and support, please email: support@desilingo.com 