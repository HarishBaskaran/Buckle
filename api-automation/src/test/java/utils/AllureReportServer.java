package utils;

import io.qameta.allure.Allure;

import java.io.File;
import java.io.IOException;

public class AllureReportServer {

    private static Process allureProcess;

    public static void deleteFilesInFolder() {
        File folder = new File("./allure-results");
        if (folder.exists() && folder.isDirectory()) {
            File[] files = folder.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        if (file.delete()) {
//                            System.out.println("Deleted file: " + file.getName());
                        } else {
//                            System.out.println("Failed to delete file: " + file.getName());
                        }
                    }
                }
            }
        } else {
            System.out.println("Invalid folder path or folder does not exist.");
        }
        System.out.println("Deleted Allure files");
    }

    public static void attachLogsToAllure(String logBuffer) {
        Allure.addAttachment("Custom Logs", "text/plain", logBuffer.toString());
    }

    public static void logErrorMessage(String errorMessage) {
        Allure.addAttachment("Error Message", "text/plain", errorMessage);
    }

    public static void logStepMessage(String logMessage) {
        Allure.addAttachment("Log", "text/plain", logMessage);
    }

    public static void main(String[] args) {
        startAllureReportServer();
    }

    public static void startAllureReportServer() {
        try {
            // Replace this with the path to your Allure report folder
            String reportFolderPath = "./allure-results";

            // Use ProcessBuilder to execute the Allure serve command as a subprocess
            ProcessBuilder processBuilder = new ProcessBuilder("allure", "serve", reportFolderPath);

            // Redirect the subprocess output (optional)
            processBuilder.redirectOutput(ProcessBuilder.Redirect.INHERIT);
            processBuilder.redirectError(ProcessBuilder.Redirect.INHERIT);

            // Start the subprocess
            allureProcess = processBuilder.start();

            System.out.println("Allure report server started successfully.");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void restartAllureReportServer() {
        // Stop the server if it's already running
        stopAllureReportServer();

        // Start the server again
        startAllureReportServer();
    }

    public static void stopAllureReportServer() {
        if (allureProcess != null) {
            // Stop the subprocess gracefully
            allureProcess.destroy();

            // Wait for the subprocess to terminate
            try {
                allureProcess.waitFor();
                System.out.println("Allure report server stopped.");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            // Reset the Process object
            allureProcess = null;
        }
    }
}

