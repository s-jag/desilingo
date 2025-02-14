# DesiLingo Technical Documentation

## Database Design Details

### Table Relationships

```mermaid
erDiagram
    USERS ||--o{ USER_LESSONS : "tracks progress"
    USERS ||--o{ USER_QUIZZES : "tracks quiz results"
    LANGUAGES ||--o{ LESSONS : "1 language can have many lessons"
    LESSONS ||--o{ LESSON_CONTENTS : "1 lesson can have multiple content blocks"
    LESSONS ||--o{ QUIZZES : "1 lesson can have multiple quizzes"
    QUIZZES ||--o{ QUIZ_QUESTIONS : "1 quiz can have multiple questions"
    QUIZ_QUESTIONS ||--o{ QUIZ_OPTIONS : "1 question can have multiple options"
```

### Detailed Table Specifications

#### users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'learner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
- `id`: Auto-incrementing primary key
- `password`: Bcrypt hashed, never stored in plain text
- `role`: Enum type with values: 'learner', 'admin', 'teacher'

#### languages
```sql
CREATE TABLE languages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
- `code`: ISO 639-1 language codes (e.g., 'hi' for Hindi)
- Unique constraint on language codes

### Database Indexes
1. **Primary Indexes**
   - All tables have primary key indexes
   - Composite primary keys on junction tables

2. **Foreign Key Indexes**
   ```sql
   CREATE INDEX idx_lessons_language ON lessons(language_id);
   CREATE INDEX idx_lesson_contents_lesson ON lesson_contents(lesson_id);
   CREATE INDEX idx_quizzes_lesson ON quizzes(lesson_id);
   CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);
   CREATE INDEX idx_quiz_options_question ON quiz_options(question_id);
   ```

3. **User Progress Indexes**
   ```sql
   CREATE INDEX idx_user_lessons_user ON user_lessons(user_id);
   CREATE INDEX idx_user_lessons_lesson ON user_lessons(lesson_id);
   CREATE INDEX idx_user_quizzes_user ON user_quizzes(user_id);
   CREATE INDEX idx_user_quizzes_quiz ON user_quizzes(quiz_id);
   ```

### Automatic Timestamp Management

Triggers automatically update `updated_at` timestamps:

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';
```

## Frontend Architecture

### Component Hierarchy

```
App
├── Landing
│   ├── Navigation
│   ├── Hero
│   └── Features
├── Login
│   ├── LoginForm
│   └── AuthContext
├── Dashboard
│   ├── LanguageProgress
│   ├── DailyGoals
│   └── QuickActions
└── Profile
    ├── UserStats
    ├── ProfileForm
    └── ProgressCharts
```

### State Management

1. **Authentication State**
   ```typescript
   interface AuthState {
     user: User | null;
     isAuthenticated: boolean;
     token: string | null;
   }
   ```

2. **Learning Progress State**
   ```typescript
   interface ProgressState {
     currentLesson: Lesson | null;
     completedLessons: number[];
     quizScores: Record<number, number>;
   }
   ```

### API Integration

#### Base API Configuration
```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

#### Authentication Interceptor
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Docker Configuration

### Services

1. **PostgreSQL**
   ```yaml
   postgres:
     image: postgres:15-alpine
     environment:
       POSTGRES_DB: desilingo
       POSTGRES_USER: desilingo_user
       POSTGRES_PASSWORD: desilingo_password
     volumes:
       - postgres_data:/var/lib/postgresql/data
   ```

2. **pgAdmin**
   ```yaml
   pgadmin:
     image: dpage/pgadmin4
     environment:
       PGADMIN_DEFAULT_EMAIL: admin@desilingo.com
       PGADMIN_DEFAULT_PASSWORD: admin
     ports:
       - "5050:80"
   ```

### Volume Management
- Named volume for PostgreSQL data persistence
- Bind mounts for initialization scripts

## Security Considerations

### Database Security

1. **Connection Security**
   - SSL/TLS encryption for database connections
   - Network isolation using Docker networks
   - Connection pooling for resource management

2. **Query Security**
   - Prepared statements to prevent SQL injection
   - Input validation and sanitization
   - Least privilege principle for database users

### API Security

1. **Authentication**
   - JWT-based authentication
   - Token expiration and refresh mechanism
   - Secure cookie storage

2. **Authorization**
   - Role-based access control (RBAC)
   - Resource-level permissions
   - API rate limiting

## Performance Optimization

### Database Optimization

1. **Query Optimization**
   - Proper indexing strategy
   - Query plan analysis
   - Connection pooling

2. **Caching Strategy**
   - Redis for frequently accessed data
   - Cache invalidation patterns
   - Session storage

### Frontend Optimization

1. **Code Splitting**
   ```typescript
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   const Profile = lazy(() => import('./pages/Profile'));
   ```

2. **Asset Optimization**
   - Image compression
   - Lazy loading of images
   - Code minification

## Testing Strategy

### Unit Testing
```typescript
describe('UserService', () => {
  it('should authenticate user with valid credentials', async () => {
    const result = await UserService.authenticate({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(result.token).toBeDefined();
  });
});
```

### Integration Testing
```typescript
describe('Lesson API', () => {
  it('should create new lesson', async () => {
    const response = await request(app)
      .post('/api/lessons')
      .send(lessonData)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
  });
});
```

## Deployment

### Production Considerations

1. **Environment Variables**
   ```bash
   NODE_ENV=production
   DATABASE_URL=postgresql://user:password@host:5432/desilingo
   REDIS_URL=redis://host:6379
   JWT_SECRET=your-secret-key
   ```

2. **SSL/TLS Configuration**
   - SSL certificate setup
   - HTTPS enforcement
   - HSTS implementation

3. **Backup Strategy**
   - Daily database backups
   - Point-in-time recovery
   - Backup verification procedures 