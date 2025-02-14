-- Seed Languages
INSERT INTO languages (name, code) VALUES
    ('Hindi', 'hi'),
    ('Tamil', 'ta'),
    ('Telugu', 'te'),
    ('Bengali', 'bn'),
    ('Punjabi', 'pa');

-- Seed Users (password is 'password123' hashed)
INSERT INTO users (name, email, password, role) VALUES
    ('Admin User', 'admin@desilingo.com', '$2a$10$xVB/GZkZNX.gNrZoXxJ9v.YHKJcFxpH1OnZqbW.DMUs1yGKl.TCxq', 'admin'),
    ('Test User', 'user@desilingo.com', '$2a$10$xVB/GZkZNX.gNrZoXxJ9v.YHKJcFxpH1OnZqbW.DMUs1yGKl.TCxq', 'learner');

-- Seed Lessons for Hindi
INSERT INTO lessons (language_id, level, title, description) VALUES
    (1, 1, 'Basic Hindi Greetings', 'Learn common Hindi greetings and introductions'),
    (1, 1, 'Numbers 1-10 in Hindi', 'Master counting from 1 to 10 in Hindi'),
    (1, 2, 'Common Hindi Phrases', 'Essential phrases for daily conversations');

-- Seed Lesson Contents
INSERT INTO lesson_contents (lesson_id, content_type, content_body, media_url, sequence_order) VALUES
    (1, 'text', 'Namaste (नमस्ते) is the most common greeting in Hindi.', NULL, 1),
    (1, 'audio', NULL, '/audio/namaste.mp3', 2),
    (1, 'text', 'Practice saying Namaste with the correct pronunciation.', NULL, 3);

-- Seed Quizzes
INSERT INTO quizzes (lesson_id, name) VALUES
    (1, 'Greetings Quiz'),
    (2, 'Numbers Quiz');

-- Seed Quiz Questions
INSERT INTO quiz_questions (quiz_id, question_text, question_type) VALUES
    (1, 'What is the most common greeting in Hindi?', 'multiple_choice'),
    (1, 'When do you use Namaste?', 'multiple_choice');

-- Seed Quiz Options
INSERT INTO quiz_options (question_id, option_text, is_correct) VALUES
    (1, 'Namaste', true),
    (1, 'Hello', false),
    (1, 'Hi', false),
    (2, 'Any time of day', true),
    (2, 'Only in the morning', false),
    (2, 'Only in the evening', false);

-- Seed User Progress
INSERT INTO user_lessons (user_id, lesson_id, status, score) VALUES
    (2, 1, 'in_progress', 50),
    (2, 2, 'not_started', 0);

INSERT INTO user_quizzes (user_id, quiz_id, attempts, best_score) VALUES
    (2, 1, 1, 80),
    (2, 2, 0, 0); 