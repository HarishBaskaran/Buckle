package coe.smartapi.controllers;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

@RestController
@CrossOrigin
public class FileUploadDownloadController {

    @PostMapping("/upload-folder")
    public void uploadFolder(@RequestParam("folder") MultipartFile folder,
                             @RequestParam("folderName") String folderName) throws IOException {
        // Create a temporary directory to store the uploaded folder
        File tempDir = new File(System.getProperty("java.io.tmpdir"));
        File uploadedFolder = new File(tempDir, folderName);

        // Save the uploaded folder
        folder.transferTo(uploadedFolder);

        // Handle the uploaded folder as needed
        // For example, you can process the contents of the folder or store it in a specific location
    }

    @GetMapping("/download-folder")
    public ResponseEntity<FileSystemResource> downloadFolder(@RequestParam("folderName") String folderName) throws IOException {

        String folderPath = System.getProperty("user.dir") + "/collections/"
                + folderName;

        File folderToDownload = new File(folderPath);

        // Set the response headers for file download
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=downloaded-folder.zip");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new FileSystemResource(folderToDownload));
    }
}
