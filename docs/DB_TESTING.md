# Complete Database Testing Guide for DesiLingo

## 1. Prerequisites
- Docker and Docker Compose installed
- Basic SQL knowledge
- Terminal/Command Prompt access

## 2. Starting the Environment

1. First, ensure your containers are running:

```bash
docker compose up -d
```

Verify containers are running
docker ps
```

2. Access the database using pgAdmin:

- Open your browser and navigate to:

```

## 3. Access Methods

### Method 1: pgAdmin (Recommended for Beginners)

1. **Access pgAdmin**:
   - Open your browser
   - Go to: `http://localhost:5050`
   - Login credentials:
     ```
     Email: admin@desilingo.com
     Password: admin
     ```

2. **Add Database Server**:
   ```
   1. Right-click "Servers" in the left panel
   2. Select Register → Server
   3. In the dialog that opens:
      
      General Tab:
      - Name: DesiLingo
      
      Connection Tab:
      - Host: postgres
      - Port: 5432
      - Database: desilingo
      - Username: desilingo_user
      - Password: desilingo_password
      - Save password: Yes (check box)
   ```

3. **Navigate Database**:
   ```
   Servers
   └── DesiLingo
       └── Databases
           └── desilingo
               └── Schemas
                   └── public
                       └── Tables
   ```

4. **View Table Data**:
   - Right-click any table → View/Edit Data → All Rows
   - Or use Query Tool (lightning bolt icon) for custom SQL

### Method 2: Command Line (For Advanced Users)

1. **Connect to Database Container**:

```bash
docker exec -it desilingo_db psql -U desilingo_user -d desilingo
```

2. **Useful PSQL Commands**:
```sql
-- List all tables
\dt

-- Describe table structure
\d table_name
\d users

-- Basic queries
SELECT * FROM users;
SELECT * FROM languages;
SELECT * FROM lessons;

-- Exit psql
\q
```

## 4. Common Testing Queries

### User Management
```sql
-- View all users
SELECT * FROM users;

-- Check user roles
SELECT name, email, role FROM users;

-- Find specific user
SELECT * FROM users WHERE email = 'user@desilingo.com';

-- Count users by role
SELECT role, COUNT(*) FROM users GROUP BY role;
```

### Learning Progress
```sql
-- View user lesson progress
SELECT 
    u.name,
    l.title,
    ul.status,
    ul.score
FROM users u
JOIN user_lessons ul ON u.id = ul.user_id
JOIN lessons l ON ul.lesson_id = l.id;

-- Check quiz performance
SELECT 
    u.name,
    uq.quiz_id,
    uq.attempts,
    uq.best_score
FROM users u
JOIN user_quizzes uq ON u.id = uq.user_id;
```

### Language and Lesson Data
```sql
-- View available languages
SELECT * FROM languages;

-- List lessons by language
SELECT 
    l.name as language,
    ls.title,
    ls.level
FROM languages l
JOIN lessons ls ON l.id = ls.language_id
ORDER BY l.name, ls.level;
```

## 5. Data Modification Examples

### Adding Test Data
```sql
-- Add new user
INSERT INTO users (name, email, password, role) 
VALUES ('Test Student', 'student@test.com', 
        '$2a$10$xVB/GZkZNX.gNrZoXxJ9v.YHKJcFxpH1OnZqbW.DMUs1yGKl.TCxq', 
        'learner');

-- Record lesson progress
INSERT INTO user_lessons (user_id, lesson_id, status, score) 
VALUES (
    (SELECT id FROM users WHERE email = 'student@test.com'),
    (SELECT id FROM lessons LIMIT 1),
    'in_progress',
    75
);
```

### Updating Records
```sql
-- Update user role
UPDATE users 
SET role = 'teacher' 
WHERE email = 'student@test.com';

-- Update lesson progress
UPDATE user_lessons 
SET status = 'completed', score = 100 
WHERE user_id = (SELECT id FROM users WHERE email = 'student@test.com');
```

## 6. Database Maintenance

### Backup and Restore
```bash
# Create backup
docker exec desilingo_db pg_dump -U desilingo_user desilingo > backup.sql

# Restore from backup
docker exec -i desilingo_db psql -U desilingo_user desilingo < backup.sql
```

### Reset Database
```sql
-- Clear all data (careful!)
TRUNCATE users CASCADE;
TRUNCATE languages CASCADE;
TRUNCATE lessons CASCADE;

-- Reset auto-increment counters
ALTER SEQUENCE users_id_seq RESTART WITH 1;
```

## 7. Troubleshooting

### Common Issues and Solutions

1. **Cannot Connect to Database**:
```bash
# Check if container is running
docker ps | grep desilingo_db

# Check container logs
docker logs desilingo_db

# Restart container
docker-compose restart postgres
```

2. **Reset pgAdmin Password**:
```bash
# Stop containers
docker-compose down

# Start fresh
docker-compose up -d
```

3. **View Container Network**:
```bash
# Check network connectivity
docker network ls
docker network inspect desilingo_network
```

Remember to always backup your data before making significant changes, and be careful with DELETE or TRUNCATE operations in a production environment!
```

This markdown file provides a comprehensive guide for testing and managing the DesiLingo database. The content is well-structured and includes all necessary commands and examples for both beginners and advanced users.