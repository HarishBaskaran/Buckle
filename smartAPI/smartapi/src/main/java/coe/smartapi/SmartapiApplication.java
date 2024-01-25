package coe.smartapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@SpringBootApplication
public class SmartapiApplication {

    public static void main(String[] args) {

        String directoryPath = System.getProperty("user.dir") + "/collections";
        Path directory = Paths.get(directoryPath);

        try {
            if (!Files.exists(directory)) {
                Files.createDirectory(directory);
            } else {
                System.out.println("Directory already exists: " + directoryPath);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        SpringApplication.run(SmartapiApplication.class, args);
    }

}
