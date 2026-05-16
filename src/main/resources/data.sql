-- Password is 'password' encoded using BCrypt
INSERT INTO users (name, email, password, role) VALUES ('Admin User', 'admin@jpm.com', '$2a$10$wN9HwJv2uOT1JbO3.E.rLef7mZ2Y6z28rJ20x0qE7l7hBvB8i68U.', 'ADMIN');
INSERT INTO users (name, email, password, role) VALUES ('Tech Corp', 'employer@tech.com', '$2a$10$wN9HwJv2uOT1JbO3.E.rLef7mZ2Y6z28rJ20x0qE7l7hBvB8i68U.', 'EMPLOYER');
INSERT INTO users (name, email, password, role) VALUES ('John Doe', 'student@student.com', '$2a$10$wN9HwJv2uOT1JbO3.E.rLef7mZ2Y6z28rJ20x0qE7l7hBvB8i68U.', 'STUDENT');

INSERT INTO jobs (title, description, salary, location, employer_id) VALUES ('Software Engineer', 'Develop and maintain scalable spring boot backend architectures.', 80000, 'New York', 2);
INSERT INTO jobs (title, description, salary, location, employer_id) VALUES ('Frontend Developer', 'Build rich and dynamic user interfaces using modern CSS frameworks.', 75000, 'Remote', 2);
