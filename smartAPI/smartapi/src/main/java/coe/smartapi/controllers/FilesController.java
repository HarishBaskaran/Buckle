package coe.smartapi.controllers;

import coe.smartapi.model.CollectionModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.List;
import java.util.Map;

import static coe.smartapi.utils.FolderTraversalExample.getCollectionsList;

@RestController
@CrossOrigin
public class FilesController {

    @GetMapping("/files")
    public Map<String, List<CollectionModel>> getFiles() {
        return getCollectionsList();
    }

    @PostMapping("/files")
    public String createFile(@RequestParam String fileName, @RequestParam String folderName) {

        String filePath = new DirectoryController().directoryControllerPath + folderName + File.separator + fileName;

        File file = new File(filePath);
        try {
            if (file.createNewFile()) {
                return "File created successfully";
            } else {
                return "File already exists";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to create file";
        }
    }

    @DeleteMapping("/files")
    public String deleteFile(@RequestParam String fileName, @RequestParam String folderName) {

        String filePath = new DirectoryController().directoryControllerPath +
                folderName + File.separator + fileName;

        File file = new File(filePath);

        if (file.exists()) {
            if (file.delete()) {
                return "File deleted successfully";
            } else {
                return "Failed to delete file";
            }
        } else {
            return "File does not exist";
        }
    }

    @PutMapping("/files")
    public String renameFile(@RequestParam String oldFileName, @RequestParam String newFileName, @RequestParam String folderName) {
        // Construct the file paths
        String oldFilePath = new DirectoryController().directoryControllerPath + folderName + File.separator + oldFileName;
        String newFilePath = new DirectoryController().directoryControllerPath + folderName + File.separator + newFileName;

        // Create the file objects
        File oldFile = new File(oldFilePath);
        File newFile = new File(newFilePath);

        if (oldFile.exists()) {
            if (oldFile.renameTo(newFile)) {
                return "File renamed successfully";
            } else {
                return "Failed to rename file";
            }
        } else {
            return "File does not exist";
        }
    }

    @GetMapping("/save")
    public ResponseEntity<String> getData(@RequestParam String folderName, @RequestParam String requestName) {
        try {
            String filePath = new DirectoryController().directoryControllerPath
                    + folderName + File.separator + requestName;

            // Read the file content
            File file = new File(filePath);
            StringBuilder content = new StringBuilder();
            BufferedReader reader = new BufferedReader(new FileReader(file));
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
            reader.close();

            // Convert content to JSON string
            String json = content.toString();

//            System.out.println(json);
            // Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Build the response entity with the JSON data and headers
            return new ResponseEntity<>(json, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to retrieve data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/save")
    public String saveRequest(@RequestParam String folderName, @RequestParam String requestName, @RequestBody Map<String, Object> requestData) {

        try {
            String filePath = new DirectoryController().directoryControllerPath
                    + folderName + File.separator + requestName;

            String jsonData = new ObjectMapper().writeValueAsString(requestData);

            // Write the JSON string to the file
            FileWriter fileWriter = new FileWriter(filePath);
            fileWriter.write(jsonData);
            fileWriter.close();

            return "Request saved successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to save request";
        }
    }

    @PostMapping("/environment")
    public String saveEnvironment(@RequestBody List<Map<String, Object>> requestData) {

        try {
            String filePath = "environment.json";

            String jsonData = new ObjectMapper().writeValueAsString(requestData);

            // Write the JSON string to the file
            FileWriter fileWriter = new FileWriter(filePath);
            fileWriter.write(jsonData);
            fileWriter.close();

            return "Request saved successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to save request";
        }
    }

    @GetMapping("/environment")
    public ResponseEntity<String> getEnvironmentData() {
        try {
            String filePath = "environment.json";

            // Read the file content
            File file = new File(filePath);
            StringBuilder content = new StringBuilder();
            BufferedReader reader = new BufferedReader(new FileReader(file));
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
            reader.close();

            // Convert content to JSON string
            String json = content.toString();

//            System.out.println(json);
            // Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Build the response entity with the JSON data and headers
            return new ResponseEntity<>(json, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to retrieve data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/authorization")
    public String saveAuthorization(@RequestBody List<Map<String, Object>> requestData) {

        try {
            String filePath = "authorization.json";

            String jsonData = new ObjectMapper().writeValueAsString(requestData);

            // Write the JSON string to the file
            FileWriter fileWriter = new FileWriter(filePath);
            fileWriter.write(jsonData);
            fileWriter.close();

            return "Request saved successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to save request";
        }
    }

    @GetMapping("/authorization")
    public ResponseEntity<String> getaAuthorizationData() {
        try {
            String filePath = "authorization.json";

            // Read the file content
            File file = new File(filePath);
            StringBuilder content = new StringBuilder();
            BufferedReader reader = new BufferedReader(new FileReader(file));
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line);
            }
            reader.close();

            // Convert content to JSON string
            String json = content.toString();

//            System.out.println(json);
            // Set the response headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Build the response entity with the JSON data and headers
            return new ResponseEntity<>(json, headers, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to retrieve data", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile() throws IOException {
        // Retrieve the file to be downloaded
        Resource fileResource = new FileSystemResource("ExtentReport.html");

        // Set the content-type and headers for the response
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=report.html");

//        System.out.println("entered file download");
        // Return the file as a ResponseEntity with appropriate headers
        return ResponseEntity.ok()
                .headers(headers)
                .body(fileResource);
    }

    @GetMapping("/checkFile")
    public String checkFiles() {
        File f = new File("ExtentReport.html");
        if (f.exists() && !f.isDirectory()) {
            return "the file is there";
        } else {
            return "it doesnot contain the file";
        }
    }
}
