package coe.smartapi.controllers;

import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
public class DirectoryController {

    public static String directoryControllerPath = System.getProperty("user.dir") + "/collections/";

    @PostMapping("/directory")
    public String createDirectory(@RequestParam String folderName) {

        String directoryPath = directoryControllerPath + folderName;

        Path directory = Paths.get(directoryPath);

        try {
            Files.createDirectory(directory);
            return "Directory created successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to create directory";
        }
    }

    @DeleteMapping("/directory")
    public String deleteDirectory(@RequestParam String folderName) {
        String directoryPath = directoryControllerPath + folderName;

        Path directory = Paths.get(directoryPath);

        if (!Files.exists(directory)) {
            return "Directory does not exist";
        }

        try {
            Files.walk(directory)
                    .sorted((a, b) -> b.compareTo(a)) // Sort in reverse order to delete files before directories
                    .forEach(this::deleteFileOrDirectory);
            return "Directory deleted successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to delete directory";
        }
    }

    private void deleteFileOrDirectory(Path path) {
        try {
            Files.delete(path);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PutMapping("/directory")
    public String renameDirectory(@RequestParam String oldFolderName, @RequestParam String newFolderName) {

        String directoryPath = directoryControllerPath + oldFolderName;
        String newDirectoryPath = directoryControllerPath + newFolderName;

        Path directory = Paths.get(directoryPath);
        Path newDirectory = Paths.get(newDirectoryPath);

        if (!Files.exists(directory)) {
            return "Directory does not exist";
        }

        try {
            Files.move(directory, newDirectory);
            return "Directory renamed successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to rename directory";
        }
    }

    @PatchMapping("/directory")
    public String setDirectoryPath(@RequestParam String folderPath){
        if (!folderPath.endsWith("/")) {
            folderPath += "/";
        }
        directoryControllerPath = folderPath;
        return folderPath;
    }

    @GetMapping("/directory")
    public List<String> getFilesFromDirectory(@RequestParam String folderName){
        String directoryPath = directoryControllerPath + folderName;

        File directory = new File(directoryPath);

        if (!directory.isDirectory()) {
            throw new IllegalArgumentException("The specified path is not a directory.");
        }

        String[] files = directory.list();
        if (files != null) {
            return Arrays.asList(files);
        } else {
            throw new RuntimeException("Failed to retrieve files from the directory.");
        }
    }
}
