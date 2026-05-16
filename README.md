---

# Job Portal Management System

A scalable Job Portal application built using Spring Boot.
This application allows Employers to post jobs, Students to search and apply for them, and Admins to manage the entire platform. It includes features such as role-based access control, responsive dashboards, and interactive UI components.

---

## Features

### Core Features

* Role-based user accounts (Admin, Employer, Student)
* Secure User Registration and Login
* Job creation and management for Employers
* Job search and application submission for Students
* Centralized management for Admins

### Advanced Features

* Chatbot Integration for quick assistance
* Spring Security integration for authentication and authorization
* H2 Database for seamless development and testing
* Server-side rendered dynamic UI using Thymeleaf

---

## Tech Stack

* Backend: Java 21, Spring Boot
* Database: H2 Database (In-Memory) / Spring Data JPA
* Frontend: Thymeleaf, HTML5, Vanilla CSS
* Security: Spring Security
* Build Tool: Maven

---

## Project Structure

```
src/main/
 ├── java/com/jobportal/jpm/
 │     ├── config/        # Security and custom user details configurations
 │     ├── controller/    # Route handlers (Admin, Employer, Student, Auth, Job)
 │     ├── model/         # JPA Entities (User, Job, Application, Role)
 │     ├── repository/    # Spring Data JPA Repositories
 │     ├── service/       # Business logic and services
 │     └── JobPortalApplication.java
 └── resources/
       ├── static/css/    # Styling (style.css)
       ├── templates/     # Thymeleaf HTML views and fragments
       └── application.properties # App configuration
```

---

## Application Flow

```
User → POST /register → Store user in database with specific Role
Student → GET /student/dashboard → View jobs → POST /apply → Submit application
Employer → POST /jobs/add → Create a new job listing
Admin → GET /admin/users → Manage registered users and platform activity
```

---

## Setup Instructions

### 1. Clone Repository

```
git clone https://github.com/nivi2604/JobPortal.git
cd JobPortal
```

### 2. Build the Project (Optional)

```
mvnw clean install
```
*(On Windows, you can use `mvnw.cmd clean install`)*

### 3. Run Application

```
mvnw spring-boot:run
```
*(On Windows, you can use `mvnw.cmd spring-boot:run`)*

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```
*(Note: H2 Console can be accessed at `http://localhost:8080/h2-console` if enabled)*

---

## Notes

* H2 Database is used for simplicity and rapid development. It can easily be replaced with MySQL or PostgreSQL by updating the `application.properties` file.
* A Chatbot fragment is included in the templates to assist users interactively.

---

## Challenges Faced

* Implementing robust Role-Based Access Control (RBAC) with Spring Security
* Managing JPA entity relationships between Users, Jobs, and Applications
* Designing clean, responsive dashboards without relying on heavy frontend frameworks

---

## Future Improvements

* Add Email/OTP Verification during user registration
* Integrate PostgreSQL for production deployment
* Implement Resume Parsing for student profiles
* Build separate RESTful APIs for potential mobile app integration
* Enhance analytics and reporting on the Admin dashboard

---

## Learning Outcomes

* Backend development using Spring Boot and Java
* Implementing comprehensive security with Spring Security
* Building dynamic Server-Side Rendered (SSR) pages using Thymeleaf
* Database modeling and abstraction with Spring Data JPA

---

## Author

GitHub: [nivi2604](https://github.com/nivi2604)
