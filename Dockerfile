# --- Stage 1: Build Frontend ---
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY campusmart-frontend/package*.json ./
RUN npm install
COPY campusmart-frontend/ ./
RUN npm run build

# --- Stage 2: Build Backend ---
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
WORKDIR /backend
COPY campusmart-backend/pom.xml .
# Copy the frontend build into Spring Boot's static resources
COPY --from=frontend-build /frontend/dist ./src/main/resources/static
COPY campusmart-backend/src ./src
RUN mvn clean package -DskipTests

# --- Stage 3: Run Application ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-build /backend/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
