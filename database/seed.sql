-- Store Rating Application Seed Data
USE store_rating_db;

-- Insert sample users (password: password123!)
INSERT INTO users (name, email, password, address, role) VALUES 
('System Administrator User', 'admin@storerating.com', '$2a$12$rTqRfVgZfV8t0qNc5V8XOOwP7.4wY7VcWVKz8oV8F8QrXmYKNtH7W', '123 Admin Street, Admin City, AC 12345', 'system_admin'),
('John Store Owner Manager', 'john.store@electronics.com', '$2a$12$rTqRfVgZfV8t0qNc5V8XOOwP7.4wY7VcWVKz8oV8F8QrXmYKNtH7W', '456 Business Ave, Commerce City, CC 67890', 'store_owner'),
('Alice Johnson Normal User', 'alice.johnson@email.com', '$2a$12$rTqRfVgZfV8t0qNc5V8XOOwP7.4wY7VcWVKz8oV8F8QrXmYKNtH7W', '111 Residential Lane, User Town, UT 11111', 'normal_user');

-- Insert sample stores
INSERT INTO stores (name, email, address, owner_id) VALUES 
('TechWorld Electronics Store', 'contact@techworld.com', '456 Business Ave, Commerce City, CC 67890', 2);

-- Insert sample ratings
INSERT INTO ratings (user_id, store_id, rating) VALUES 
(3, 1, 5);
