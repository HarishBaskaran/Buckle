package coe.smartapi.utils;

import io.qameta.allure.Allure;

import java.io.IOException;

public class AllureReportServer {

    private static Process allureProcess;

    public static void logErrorMessage(String errorMessage) {
        Allure.addAttachment("Error Message", "text/plain", errorMessage);
    }

    public static void logStepMessage(String logMessage) {
        Allure.addAttachment("Log", "text/plain", logMessage);
    }

    public static void main(String[] args) {
        // Start the Allure report server
        startAllureReportServer();

        // Add a shutdown hook to stop the server when the program terminates
//        Runtime.getRuntime().addShutdownHook(new Thread(AllureReportServer::stopAllureReportServer));
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

