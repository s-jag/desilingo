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

-- Hindi Course Structure (Beginner Level)
INSERT INTO lessons (language_id, level, title, description) VALUES
    -- Unit 1: Basics
    (1, 1, 'Basic Greetings', 'Learn essential Hindi greetings and introductions'),
    (1, 1, 'Numbers 1-10', 'Master counting from 1 to 10 in Hindi'),
    (1, 1, 'Simple Phrases', 'Common everyday expressions'),
    
    -- Unit 2: Family
    (1, 1, 'Family Members', 'Learn words for family relationships'),
    (1, 1, 'Family Conversations', 'Simple dialogues about family'),
    
    -- Unit 3: Food & Drinks
    (1, 2, 'Common Foods', 'Essential vocabulary for Indian foods'),
    (1, 2, 'Ordering Food', 'How to order food in Hindi'),
    
    -- Unit 4: Daily Life
    (1, 2, 'Daily Activities', 'Describe your daily routine'),
    (1, 2, 'Time and Schedule', 'Tell time and make plans in Hindi');

-- Detailed Lesson Content for Basic Greetings
INSERT INTO lesson_contents (lesson_id, content_type, content_body, media_url, sequence_order) VALUES
    -- Lesson 1: Basic Greetings
    (1, 'text', 'नमस्ते (Namaste) is the most common greeting in Hindi.', NULL, 1),
    (1, 'audio', NULL, '/audio/namaste.mp3', 2),
    (1, 'text', 'Practice saying Namaste with the correct pronunciation.', NULL, 3),
    (1, 'text', 'शुभ प्रभात (Shubh Prabhat) means "Good Morning"', NULL, 4),
    (1, 'audio', NULL, '/audio/shubh-prabhat.mp3', 5),
    (1, 'video', NULL, '/video/greetings-usage.mp4', 6),
    
    -- Lesson 2: Numbers
    (2, 'text', 'Let''s learn numbers 1-5 in Hindi:', NULL, 1),
    (2, 'text', '१ - एक (ek) = 1', NULL, 2),
    (2, 'text', '२ - दो (do) = 2', NULL, 3),
    (2, 'text', '३ - तीन (teen) = 3', NULL, 4),
    (2, 'text', '४ - चार (chaar) = 4', NULL, 5),
    (2, 'text', '५ - पाँच (paanch) = 5', NULL, 6),
    (2, 'audio', NULL, '/audio/numbers-1-5.mp3', 7),
    
    -- Lesson 3: Simple Phrases
    (3, 'text', 'धन्यवाद (Dhanyavaad) = Thank you', NULL, 1),
    (3, 'audio', NULL, '/audio/dhanyavaad.mp3', 2),
    (3, 'text', 'कृपया (Kripya) = Please', NULL, 3),
    (3, 'audio', NULL, '/audio/kripya.mp3', 4);

-- Create quizzes for the lessons
INSERT INTO quizzes (lesson_id, name) VALUES
    (1, 'Greetings Quiz'),
    (2, 'Numbers Quiz'),
    (3, 'Phrases Quiz');

-- Quiz questions for Greetings
INSERT INTO quiz_questions (quiz_id, question_text, question_type) VALUES
    -- Greetings Quiz
    (1, 'What is the most common greeting in Hindi?', 'multiple_choice'),
    (1, 'When do you use Namaste?', 'multiple_choice'),
    (1, 'How do you say "Good Morning" in Hindi?', 'multiple_choice'),
    
    -- Numbers Quiz
    (2, 'What is the Hindi word for "one"?', 'multiple_choice'),
    (2, 'Select the correct number: तीन', 'multiple_choice'),
    (2, 'Match the number to its Hindi word: पाँच', 'multiple_choice'),
    
    -- Phrases Quiz
    (3, 'How do you say "thank you" in Hindi?', 'multiple_choice'),
    (3, 'What does "कृपया" mean?', 'multiple_choice');

-- Quiz options
INSERT INTO quiz_options (question_id, option_text, is_correct) VALUES
    -- Greetings Quiz Options
    (1, 'Namaste', true),
    (1, 'Hello', false),
    (1, 'Hi', false),
    (2, 'Any time of day', true),
    (2, 'Only in the morning', false),
    (2, 'Only in the evening', false),
    (3, 'Shubh Prabhat', true),
    (3, 'Namaste', false),
    (3, 'Dhanyavaad', false),
    
    -- Numbers Quiz Options
    (4, 'एक (ek)', true),
    (4, 'दो (do)', false),
    (4, 'तीन (teen)', false),
    (5, '3', true),
    (5, '2', false),
    (5, '4', false),
    (6, '5', true),
    (6, '3', false),
    (6, '4', false),
    
    -- Phrases Quiz Options
    (7, 'धन्यवाद (Dhanyavaad)', true),
    (7, 'कृपया (Kripya)', false),
    (7, 'नमस्ते (Namaste)', false),
    (8, 'Please', true),
    (8, 'Thank you', false),
    (8, 'Welcome', false);

-- Seed some user progress
INSERT INTO user_lessons (user_id, lesson_id, status, score) VALUES
    (2, 1, 'completed', 100),
    (2, 2, 'in_progress', 50),
    (2, 3, 'not_started', 0);

INSERT INTO user_quizzes (user_id, quiz_id, attempts, best_score) VALUES
    (2, 1, 2, 100),
    (2, 2, 1, 80),
    (2, 3, 0, 0); 