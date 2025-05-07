FROM gradle:8.5.0-jdk21 AS build
WORKDIR /app
COPY . /app
RUN gradle bootJar --no-daemon

FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

