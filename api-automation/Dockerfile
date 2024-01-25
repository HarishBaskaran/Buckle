FROM openjdk:11-jre-slim

WORKDIR /app
COPY target/b2c-MockServer-jar-with-dependencies.jar /app

EXPOSE 9195

CMD ["java", "-jar", "b2c-MockServer-jar-with-dependencies.jar"]

# docker build -t b2capiautomation .
# docker run -it b2capiautomation

# mvn clean compile package -P build-mockServer -> Gives the JAR file in target folder

# mvn clean install -P run-tests-with-mock -Dkarate.env=mock -Dkarate.tags=@authclear