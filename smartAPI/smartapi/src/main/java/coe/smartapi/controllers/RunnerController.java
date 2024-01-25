package coe.smartapi.controllers;

import coe.smartapi.runners.CollectionRunner;
import coe.smartapi.runners.RunnerWithAllureWithoutParallel;
import coe.smartapi.model.TestCases;
import coe.smartapi.runners.RunnerWithExtentWithoutParallel;
import coe.smartapi.runners.RunnerWithoutParallelAndReport;
import coe.smartapi.utils.LoginFlow;
import coe.smartapi.waste.TestNGRunner;
import coe.smartapi.model.RequestModel;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
public class RunnerController {

    @GetMapping("/health")
    public String getHealth() {
        return "Healthy";
    }


    @PostMapping("/process2")
    public void processJson2(@RequestBody RequestModel requestModel) {
        RunnerWithExtentWithoutParallel.clearMemory();
        RunnerWithExtentWithoutParallel.runnerData = requestModel;
        RunnerWithExtentWithoutParallel.extractTestCases();
        TestNGRunner.singleClassRunner();
    }

    @PostMapping("/process")
    public void processJson(
            @RequestParam String folderName, @RequestParam String requestName,
            @RequestBody RequestModel requestModel) {

        RunnerWithAllureWithoutParallel.collectionName = folderName;
        RunnerWithAllureWithoutParallel.requestName = requestName;
        RunnerWithAllureWithoutParallel.clearMemory();
        RunnerWithAllureWithoutParallel.runnerData = requestModel;
        RunnerWithAllureWithoutParallel.extractTestCases();
        RunnerWithAllureWithoutParallel.runnerMain();

    }

    @PostMapping("/sampleRun")
    public List<TestCases> processSampleRun(@RequestBody RequestModel requestModel) {

        RunnerWithoutParallelAndReport.clearMemory();
        RunnerWithoutParallelAndReport.runnerData = requestModel;
        RunnerWithoutParallelAndReport.extractTestCases();
        RunnerWithoutParallelAndReport.runnerMain();

        return RunnerWithoutParallelAndReport.testResults;
    }

    @PostMapping("/runCollection")
    public void processCollection(@RequestParam String folderName) {
        CollectionRunner.mainRunner(folderName);
    }


    @PostMapping("/authorizationRunner")
    public void processAuthorization(@RequestBody Map<String, Object> requestModel) {

        LoginFlow loginFlow = new LoginFlow((String) requestModel.get("column1"),
                (String) requestModel.get("column2"),
                (String) requestModel.get("column3"));

        loginFlow.mainRunner(loginFlow);
    }

}
