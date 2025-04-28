# 📦 최종 Dockerfile (백엔드용)

# 1. Base Image 변경
FROM openjdk:21-jdk-slim

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. gradle 파일 복사
COPY gradle gradle
COPY gradlew .
COPY build.gradle settings.gradle ./
COPY src src

# 4. 빌드
RUN chmod +x gradlew
RUN ./gradlew bootJar

# 5. jar 복사
COPY build/libs/app.jar app.jar

# 6. 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
