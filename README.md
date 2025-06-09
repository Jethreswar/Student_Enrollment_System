# 🎓 Student Registration System API Backend

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17+-orange.svg)](https://www.oracle.com/java/)
[![Oracle](https://img.shields.io/badge/Database-Oracle-red.svg)](https://www.oracle.com/database/)
[![Maven](https://img.shields.io/badge/Build-Maven-blue.svg)](https://maven.apache.org/)
[![License](https://img.shields.io/badge/License-Educational-yellow.svg)](#license)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Frontend Integration](#frontend-integration)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🎯 Overview

The **Student Registration System API Backend** is a robust, enterprise-grade RESTful web service built with Spring Boot. It serves as the backbone for a comprehensive student management platform, handling everything from student enrollment to course management and academic tracking.

This backend is designed to seamlessly integrate with a React frontend, providing a complete full-stack solution for educational institutions to manage their student registration processes efficiently.

## ✨ Key Features

### 👥 Student Management
- **Complete CRUD Operations**: Create, read, update, and delete student records
- **Student Profile Management**: Maintain detailed student information and academic history
- **Search & Filter**: Advanced querying capabilities for student data

### 📚 Course Management
- **Course Catalog**: Comprehensive course creation and management
- **Course Scheduling**: Flexible scheduling system for academic terms
- **Prerequisites Handling**: Support for course prerequisite management

### 🏫 Class Management
- **Class Scheduling**: Automated class scheduling with conflict detection
- **Instructor Assignment**: Manage instructor-class relationships
- **Capacity Management**: Handle class size limits and waitlists

### 📝 Enrollment System
- **Real-time Enrollment**: Instant enrollment processing with validation
- **Enrollment Status Tracking**: Monitor student enrollment states
- **Waitlist Management**: Automated waitlist processing
- **Drop/Add Functionality**: Flexible enrollment modification

### 📊 Audit & Logging
- **Comprehensive Logging**: Track all system activities for auditing
- **Change History**: Maintain detailed records of data modifications
- **Debug Support**: Enhanced logging for troubleshooting and monitoring

## 🛠️ Technology Stack

### **Core Framework**
- **Spring Boot 3.x** - Main application framework
- **Spring Web** - RESTful web services
- **Spring Data JPA** - Object-Relational Mapping and data access
- **Spring Boot Actuator** - Application monitoring and management

### **Database & Persistence**
- **Oracle Database** - Primary data storage
- **Oracle JDBC Driver (ojdbc11)** - Database connectivity
- **Hibernate** - JPA implementation for ORM
- **HikariCP** - High-performance connection pooling

### **Build & Development Tools**
- **Maven 3.x** - Build automation and dependency management
- **Java 17+** - Programming language and runtime
- **Spring Boot DevTools** - Development-time features (hot reload, etc.)

### **Testing Framework**
- **JUnit 5** - Unit testing framework
- **Spring Boot Test** - Integration testing support
- **Mockito** - Mocking framework for unit tests
- **TestContainers** - Integration testing with containerized databases

### **Additional Libraries**
- **Jackson** - JSON processing and serialization
- **Validation API** - Input validation and constraint checking
- **SLF4J + Logback** - Logging framework
- **Spring Security** (if implemented) - Authentication and authorization

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Spring Boot    │    │  Oracle Database│
│                 │◄──►│   REST API      │◄──►│                 │
│  (Port: 3000)   │    │  (Port: 8080)   │    │  (Port: 1521)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │   API Gateway   │              │
         │              │   (Optional)    │              │
         │              └─────────────────┘              │
         │                                               │
         └───────────────────────────────────────────────┘
                        HTTP/HTTPS Communication
```

## 📁 Project Structure

```
src/
├── main/
│   ├── java/com/spring/springjpa/
│   │   ├── controller/          # REST API Controllers
│   │   │   ├── StudentController.java
│   │   │   ├── CourseController.java
│   │   │   ├── ClassController.java
│   │   │   ├── EnrollmentController.java
│   │   │   └── LogController.java
│   │   ├── Model/              # Entity Classes (JPA)
│   │   │   ├── Student.java
│   │   │   ├── Courses.java
│   │   │   ├── Classes.java
│   │   │   ├── Enrollment.java
│   │   │   └── Logs.java
│   │   ├── repository/         # Data Access Layer
│   │   │   ├── StudentRepository.java
│   │   │   ├── CourseRepository.java
│   │   │   ├── ClassRepository.java
│   │   │   ├── EnrollmentRepository.java
│   │   │   └── LogRepository.java
│   │   ├── service/           # Business Logic Layer
│   │   │   ├── StudentService.java
│   │   │   ├── CourseService.java
│   │   │   └── EnrollmentService.java
│   │   ├── utilities/         # Helper Classes
│   │   │   ├── ApiResponse.java
│   │   │   ├── DateUtils.java
│   │   │   └── ValidationUtils.java
│   │   ├── exception/         # Exception Handling
│   │   │   ├── ResourceNotFoundException.java
│   │   │   ├── DuplicateEnrollmentException.java
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── config/           # Configuration Classes
│   │   │   ├── WebConfig.java
│   │   │   ├── CorsConfig.java
│   │   │   └── DatabaseConfig.java
│   │   └── SpringjpaApplication.java
│   └── resources/
│       ├── application.properties
│       ├── application-dev.properties
│       ├── application-prod.properties
│       └── static/
└── test/
    └── java/com/spring/springjpa/
        ├── controller/        # Controller Tests
        ├── service/          # Service Tests
        ├── repository/       # Repository Tests
        └── integration/      # Integration Tests
```

## 🔗 API Endpoints

### 👥 Student Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/students` | Retrieve all students |
| `GET` | `/api/students/{id}` | Get student by ID |
| `POST` | `/api/students` | Create new student |
| `PUT` | `/api/students/{id}` | Update student information |
| `DELETE` | `/api/students/{id}` | Delete student record |
| `GET` | `/api/students/search` | Search students by criteria |

### 📚 Course Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/courses` | List all courses |
| `GET` | `/api/courses/{id}` | Get course details |
| `POST` | `/api/courses` | Create new course |
| `PUT` | `/api/courses/{id}` | Update course information |
| `DELETE` | `/api/courses/{id}` | Remove course |
| `GET` | `/api/courses/active` | Get active courses |

### 🏫 Class Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/classes` | List all classes |
| `GET` | `/api/classes/{id}` | Get class details |
| `POST` | `/api/classes` | Create new class |
| `PUT` | `/api/classes/{id}` | Update class information |
| `DELETE` | `/api/classes/{id}` | Cancel class |
| `GET` | `/api/classes/schedule` | Get class schedules |

### 📝 Enrollment Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/enrollments` | List all enrollments |
| `GET` | `/api/enrollments/student/{studentId}` | Get student enrollments |
| `POST` | `/api/enrollments` | Enroll student in class |
| `PUT` | `/api/enrollments/{id}` | Update enrollment status |
| `DELETE` | `/api/enrollments/{id}` | Drop enrollment |
| `GET` | `/api/enrollments/class/{classId}` | Get class roster |

### 📊 Logging & Audit
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/logs` | Retrieve system logs |
| `GET` | `/api/logs/user/{userId}` | Get user activity logs |
| `GET` | `/api/logs/date-range` | Filter logs by date range |

## 🚀 Installation & Setup

### Prerequisites

- **Java 17+** - [Download here](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Installation guide](https://maven.apache.org/install.html)
- **Oracle Database** - Access to Oracle database instance
- **Git** - For version control

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/student-registration-system-backend.git
   cd student-registration-system-backend
   ```

2. **Verify Java Installation**
   ```bash
   java --version
   mvn --version
   ```

3. **Install Dependencies**
   ```bash
   mvn clean install
   ```

4. **Configure Database** (See [Configuration](#configuration) section)

5. **Run Tests** (Optional but recommended)
   ```bash
   mvn test
   ```

## ⚙️ Configuration

### Database Configuration

Create or update `src/main/resources/application.properties`:

```properties
# Application Configuration
spring.application.name=student-registration-system
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:oracle:thin:@castor.cc.binghamton.edu:1521:ACAD111
spring.datasource.username=${DB_USERNAME:your_username}
spring.datasource.password=${DB_PASSWORD:your_password}
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect
spring.jpa.properties.hibernate.format_sql=true

# Connection Pool Configuration
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=20000

# Logging Configuration
logging.level.com.spring.springjpa=DEBUG
logging.level.org.springframework.web=INFO
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n

# CORS Configuration
cors.allowed-origins=http://localhost:3000,http://localhost:3001
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed-headers=*
```

### Environment-Specific Configuration

**Development (`application-dev.properties`):**
```properties
spring.jpa.show-sql=true
logging.level.root=DEBUG
server.port=8080
```

**Production (`application-prod.properties`):**
```properties
spring.jpa.show-sql=false
logging.level.root=WARN
server.port=8080
spring.jpa.hibernate.ddl-auto=validate
```

### Environment Variables

For production deployment, set these environment variables:
```bash
export DB_USERNAME=your_production_username
export DB_PASSWORD=your_production_password
export SPRING_PROFILES_ACTIVE=prod
```

## 🏃‍♂️ Running the Application

### Development Mode

```bash
# Standard run
mvn spring-boot:run

# With specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# With custom port
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

### Production Mode

```bash
# Build JAR file
mvn clean package -DskipTests

# Run JAR file
java -jar target/springjpa-1.0.0.jar --spring.profiles.active=prod
```

### Docker Deployment (Optional)

Create `Dockerfile`:
```dockerfile
FROM openjdk:17-jdk-slim
VOLUME /tmp
COPY target/springjpa-1.0.0.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080
```

Build and run:
```bash
docker build -t student-registration-api .
docker run -p 8080:8080 student-registration-api
```

## 🧪 Testing

### Run All Tests
```bash
mvn test
```

### Run Specific Test Categories
```bash
# Unit tests only
mvn test -Dtest="**/*UnitTest"

# Integration tests only
mvn test -Dtest="**/*IntegrationTest"

# Controller tests
mvn test -Dtest="**/*ControllerTest"
```

### Test Coverage Report
```bash
mvn jacoco:report
# View report at target/site/jacoco/index.html
```

### Test Structure

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test component interactions
- **Controller Tests**: Test REST endpoints with MockMvc
- **Repository Tests**: Test data access layer with @DataJpaTest

## 🔄 Frontend Integration

### CORS Configuration

The backend is configured to work with React frontend on `http://localhost:3000`. CORS settings can be modified in `WebConfig.java` or `application.properties`.

### API Response Format

All API responses follow this standard format:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "details": "Student with ID 123 not found"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔄 Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Individual feature branches
- `hotfix/*` - Critical bug fixes

### Code Standards
- Follow Java naming conventions
- Use meaningful variable and method names
- Write comprehensive JavaDoc comments
- Maintain test coverage above 80%
- Use Spring Boot best practices

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Example:
```
feat(enrollment): add waitlist functionality

- Implement waitlist management for full classes
- Add automatic enrollment from waitlist
- Update enrollment status tracking

Closes #123
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/original-repo/student-registration-system-backend.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write code following our standards
   - Add/update tests
   - Update documentation

4. **Test Your Changes**
   ```bash
   mvn clean test
   mvn spring-boot:run # Verify application starts
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Ensure all tests pass

### Development Setup for Contributors

```bash
# Clone your fork
git clone https://github.com/yourusername/student-registration-system-backend.git

# Add upstream remote
git remote add upstream https://github.com/original-repo/student-registration-system-backend.git

# Install pre-commit hooks (optional)
mvn clean compile
```

## 🔧 Troubleshooting

### Common Issues

**Database Connection Issues**
```bash
# Check database connectivity
telnet castor.cc.binghamton.edu 1521

# Verify credentials in application.properties
# Check if Oracle service is running
```

**Build Failures**
```bash
# Clear Maven cache
mvn dependency:purge-local-repository

# Rebuild with fresh dependencies
mvn clean install -U
```

**Port Already in Use**
```bash
# Find process using port 8080
lsof -i :8080
netstat -tulpn | grep 8080

# Kill process or use different port
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

**Memory Issues**
```bash
# Increase JVM memory
export MAVEN_OPTS=-Xmx1024m
mvn spring-boot:run
```

### Debug Mode

Enable debug logging:
```properties
logging.level.com.spring.springjpa=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG
```

### Health Check

Once running, check application health:
```bash
curl http://localhost:8080/actuator/health
```

## 📊 Performance Considerations

- **Database Connection Pooling**: Configured with HikariCP for optimal performance
- **JPA Optimization**: Lazy loading and query optimization implemented
- **Caching**: Consider adding Redis for frequently accessed data
- **Pagination**: Large datasets are paginated to improve response times

## 🛡️ Security Notes

- **Input Validation**: All inputs are validated using Bean Validation
- **SQL Injection Prevention**: JPA/Hibernate provides protection
- **CORS**: Properly configured for cross-origin requests
- **Error Handling**: Sensitive information is not exposed in error messages

## 📈 Monitoring & Maintenance

### Application Metrics
- Spring Boot Actuator provides health checks and metrics
- Database connection pool monitoring
- Custom business metrics can be added

### Log Management
- Structured logging with SLF4J and Logback
- Log rotation and archival configured
- Different log levels for different environments

## 📄 License

This project is developed for **educational purposes** as part of academic coursework. 

### Educational Use License
- ✅ Use for learning and educational purposes
- ✅ Modify and experiment with the code
- ✅ Share with classmates and instructors
- ❌ Commercial use prohibited
- ❌ Distribution outside the educational context requires permission

For questions about usage rights, please get in touch with the project maintainers.

---

---

<div align="center">

**Made with ❤️ for educational purposes**

[⬆ Back to Top](#-student-registration-system-api-backend)

</div>
