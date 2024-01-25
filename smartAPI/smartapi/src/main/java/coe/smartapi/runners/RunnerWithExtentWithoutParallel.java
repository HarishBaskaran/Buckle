package coe.smartapi.runners;

import coe.smartapi.model.*;
import coe.smartapi.model.runners.Flags;
import coe.smartapi.model.runners.Values;
import coe.smartapi.utils.UrlExample;
import coe.smartapi.model.request.PreRequestConfig;
import coe.smartapi.utils.AllureReportServer;
import coe.smartapi.utils.JsonPathExample;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.markuputils.ExtentColor;
import com.aventstack.extentreports.markuputils.MarkupHelper;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.testng.annotations.*;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.io.File;
import java.util.Map;
import java.util.*;
import java.net.URI;
import java.net.URISyntaxException;

public class RunnerWithExtentWithoutParallel {

    public static RequestModel runnerData = new RequestModel();
    static List<TestCases> testCases = new ArrayList<>();

//    private static AllureLifecycle lifecycle;

    static ExtentReports extent = new ExtentReports();
    static ExtentSparkReporter spark = new ExtentSparkReporter("ExtentReport.html");
    static ExtentTest suite = null;
    static int totalNodes = 0;
    static int totalPassedNodes = 0;
    static int totalFailedNodes = 0;

    public static void clearMemory() {
        runnerData = new RequestModel();
        testCases = new ArrayList<>();

        deleteFile();

        totalNodes = 0;
        totalPassedNodes = 0;
        totalFailedNodes = 0;
        extent = new ExtentReports();
        spark = new ExtentSparkReporter("ExtentReport.html");
    }

    public static void deleteFile() {
        File file = new File("ExtentReport.html");

        if (file.exists()) {
            boolean deleted = file.delete();
            if (deleted) {
                System.out.println("File deleted successfully.");
            } else {
                System.out.println("Failed to delete the file.");
            }
        } else {
            System.out.println("File does not exist.");
        }
    }

    public static void extractTestCases() {
        int i = 0;
        for (QueryParamsOutput element : runnerData.getQueryParamsOutput()) {
            TestCases testData = new TestCases();
            testData.testMethod = runnerData.getMethod();
            testData.testHeaders = runnerData.getHeaders();
            testData.testPositive = runnerData.getPositive();
            testData.testStatusCode = element.getStatusCode();
            testData.testUrl = element.getEntity();
            testData.preRequest = runnerData.getPreRequest();

            for (PreRequestConfig preRequestConfig : runnerData.getPreRequest()) {
                String path = preRequestConfig.getSourceKey();
                Object value = "";

                switch (preRequestConfig.getSourceType().toLowerCase()) {
                    case "environment":
                        value = JsonPathExample.environmentValueGetter(path);
                        break;
                }

                boolean skipUpdate = false;
                for (ChangeSummary summary : element.getChangeSummary()) {
                    skipUpdate =
                            (preRequestConfig.getDestType().equalsIgnoreCase("request query")
                                    || preRequestConfig.getDestType().equalsIgnoreCase("request pathparams"))
                                    &&
                                    preRequestConfig.getDestKey().equals(summary.getFieldName());
                    if (skipUpdate) break;

                }

                System.out.println(preRequestConfig.toString());
                System.out.println(value);
                System.out.println(skipUpdate);

                if (!skipUpdate) {
                    Object updatedJson = "";
                    path = preRequestConfig.getDestKey();

                    switch (preRequestConfig.getDestType().toLowerCase()) {
                        case "request headers":
                            updatedJson = JsonPathExample.jsonpathSetterNew(
                                    testData.testHeaders, path, value);
                            testData.testHeaders = (Map<String, Object>) updatedJson;
                            break;
                        case "request body":
                            updatedJson = JsonPathExample.jsonpathSetterNew(
                                    testData.testPositive, (path), value);
                            testData.testPositive = (Map<String, Object>) updatedJson;
                            break;
                        case "request query":
                            updatedJson = UrlExample.queryParamReplacer(
                                    testData.testUrl, path, value);
                            testData.testUrl = (String) updatedJson;
                            break;

                        case "request pathparams":
                            updatedJson = UrlExample.pathParamReplacer(
                                    testData.testUrl, path, value);
                            testData.testUrl = (String) updatedJson;
                            break;

                    }
                }

            }

            int j = 0;
            for (ChangeSummary summary : element.getChangeSummary()) {
                if (j > 0) {
                    testData.testName = testData.testName + "<br>";
                    testData.testName = testData.testName + summary.getFieldName() + " from "
                            + summary.getOldFieldValue() + " to " + summary.getNewFieldValue();
                } else {
                    testData.testName = summary.getFieldName() + " from "
                            + summary.getOldFieldValue() + " to " + summary.getNewFieldValue();
                }
                j++;
            }
            testData.testName = testData.testName + "<br>";
            testCases.add(i++, testData);
        }

        for (Output element : runnerData.getOutput()) {
            TestCases testData = new TestCases();
            testData.testMethod = runnerData.getMethod();
            testData.testHeaders = runnerData.getHeaders();
            testData.testPositive = element.getEntity();
            testData.testStatusCode = element.getStatusCode();
            testData.testUrl = runnerData.getUrl();
            testData.preRequest = runnerData.getPreRequest();

            for (PreRequestConfig preRequestConfig : runnerData.getPreRequest()) {
                String path = preRequestConfig.getSourceKey();
                Object value = "";

                switch (preRequestConfig.getSourceType().toLowerCase()) {
                    case "environment":
                        value = JsonPathExample.environmentValueGetter(path);
                        break;
                }

                boolean skipUpdate = false;
                for (ChangeSummary summary : element.getChangeSummary()) {
                    skipUpdate =
                            preRequestConfig.getDestType().equalsIgnoreCase("request body") &&
                                    preRequestConfig.getDestKey().equals(summary.getFieldName());
                    if (skipUpdate) break;

                }

                if (!skipUpdate) {
                    Object updatedJson = "";
                    path = preRequestConfig.getDestKey();

                    switch (preRequestConfig.getDestType().toLowerCase()) {
                        case "request headers":
                            updatedJson = JsonPathExample.jsonpathSetterNew(
                                    testData.testHeaders, path, value);
                            testData.testHeaders = (Map<String, Object>) updatedJson;
                            break;
                        case "request body":
                            updatedJson = JsonPathExample.jsonpathSetterNew(
                                    testData.testPositive, (path), value);
                            testData.testPositive = (Map<String, Object>) updatedJson;
                            break;
                        case "request query":
                            updatedJson = UrlExample.queryParamReplacer(
                                    testData.testUrl, path, value);
                            testData.testUrl = (String) updatedJson;
                            break;

                    }
                }

            }

            int j = 0;
            for (ChangeSummary summary : element.getChangeSummary()) {
                if (j > 0) {
                    testData.testName = testData.testName + "<br>";
                    testData.testName = testData.testName + summary.getFieldName() + " from "
                            + summary.getOldFieldValue() + " to " + summary.getNewFieldValue();
                } else {
                    testData.testName = summary.getFieldName() + " from "
                            + summary.getOldFieldValue() + " to " + summary.getNewFieldValue();
                }
                j++;
            }
            testData.testName = testData.testName + "<br>";
            testCases.add(i++, testData);
        }

        spark.config().setDocumentTitle("SMART API Report");
        spark.config().setReportName("SMART API Test Run");
        suite = extent.createTest(runnerData.getMethod() + "-" + runnerData.getUrl());
    }

//    static String childUuid;
//    static String childUuid2;
//    static String childName;
//    static String childName2;

    @DataProvider(name = "defaultDataProvider", parallel = false)
    public static Object[][] dataProvider() {

//        childUuid = "RequestRun";
//        childName = "RequestRun";
//        final TestResultContainer childContainer = new TestResultContainer()
//                .setUuid(childUuid)
//                .setName(childName);
//        lifecycle.startTestContainer(childContainer);
//
//        childUuid2 = testCases.get(0).testMethod + "-" + testCases.get(0).testUrl;
//        childName2 = childUuid2;
//        final TestResultContainer childContainer2 = new TestResultContainer()
//                .setUuid(childUuid2)
//                .setName(childName2);
//        lifecycle.startTestContainer(childUuid, childContainer2);

        Object[][] testData = new Object[testCases.size()][1];

        for (int i = 0; i < testCases.size(); i++) {
            Object[] testcase = new Object[2];
            testcase[0] = testCases.get(i).testName;
            testcase[1] = testCases.get(i);
            testData[i][0] = testCases.get(i);
        }

        return testData;
    }

    @BeforeTest
    public void beforeTest() {
        CollectionRunner.deleteFile();
        CollectionRunner.deleteFilesInFolder("./allure-results");
        extent.attachReporter(spark);
//        lifecycle = Allure.getLifecycle();
    }

    @AfterTest
    public void afterTest() {
        suite.assignCategory("Total TestCases: " + totalNodes);
        suite.assignCategory("Passed Steps: " + totalPassedNodes);
        suite.assignCategory("Failed Steps: " + totalFailedNodes);
//        suite.getModel().setDescription("Total TestCases: " + totalNodes);
        extent.flush();
    }

    @AfterSuite
    public void afterSuite() {
//        lifecycle.stopTestContainer(childUuid2);
//        lifecycle.writeTestContainer(childUuid2);
//
//        lifecycle.stopTestContainer(childUuid);
//        lifecycle.writeTestContainer(childUuid);

        System.out.println("Runner preparing documents");
        AllureReportServer.main(null);
    }

    @Test(dataProvider = "defaultDataProvider", threadPoolSize = 4)
    public static void runner(TestCases testData) {

        ExtentTest test = suite.createNode(testData.testName);
        totalNodes++;

//        final String uuid_test = testData.testName;
//        final String name_test = testData.testName;
//        final TestResult result = new TestResult()
//                .setUuid(uuid_test)
//                .setName(name_test)
//                .setStatus(io.qameta.allure.model.Status.PASSED);
//
//        lifecycle.scheduleTestCase(result);
//        lifecycle.startTestCase(uuid_test);
//
//        Label containerLabel = new Label();
//        containerLabel.setName("suite").setValue(childName);
//
//        Label childContainerLabel = new Label();
//        childContainerLabel.setName("subSuite").setValue(childName2);
//
//        List<Label> labels = new ArrayList<>();
//        labels.add(containerLabel);
//        labels.add(childContainerLabel);
//
//        result.setLabels(labels);

        Values values = new Values();
        Flags flags = new Flags();

        splitUrl(testData.testUrl, values, flags);
        values.requestType = testData.testMethod;
        if (testData.testHeaders.size() > 0) {
            values.headers = testData.testHeaders;
            flags.headers = true;
        }
        if (testData.testPositive.size() > 0) {
            values.bodyObject = testData.testPositive;
            flags.bodyObject = true;
        }

        Response response = sendRequest(values, flags, test);

        Map<String, Object> responseDetails = new LinkedHashMap<>();
        Map<String, Object> headersMap = new LinkedHashMap<>();
        Map<String, Object> responseMap = new LinkedHashMap<>();

        for (io.restassured.http.Header header : response.getHeaders()) {
            headersMap.put(header.getName(), header.getValue());
        }
        boolean bodyFlag = false;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            if (response.getBody().asString().length() > 0) {
                responseMap = objectMapper.readValue(response.getBody().asString(), new TypeReference<Map<String, Object>>() {
                });
                bodyFlag = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        responseDetails.put("Status Code", response.getStatusCode());
        responseDetails.put("Status Line", response.getStatusLine());
        responseDetails.put("headers", headersMap);
        if (bodyFlag) responseDetails.put("body", responseMap);

        test.info("Response Details-" + "<pre>" + formatter(responseDetails) + "</pre>");

//        String uuid_step = "step-2";
//        StepResult stepResult = new StepResult()
//                .setName("Response Details")
//                .setStatus(io.qameta.allure.model.Status.PASSED); // Set the status as needed
//
//        lifecycle.startStep(uuid_step, stepResult);
//        AllureReportServer.logStepMessage(formatter(responseDetails));
//        lifecycle.stopStep();

        String testResult = "Actual Status Code: " + response.getStatusCode()
                + " &nbsp; <br /> &nbsp; " + " &nbsp; <br /> &nbsp; "
                + "Expected Status Code: " + testData.testStatusCode;

        if (response.getStatusCode() == testData.testStatusCode) {
            test.log(Status.PASS, MarkupHelper.createLabel(testResult, ExtentColor.BLUE));
            totalPassedNodes++;

//            String uuid_step_3 = "step-3";
//            StepResult stepResult_3 = new StepResult()
//                    .setName("Validation Details")
//                    .setStatusDetails(new StatusDetails().setMessage("Actual Status Code: " + response.getStatusCode()
//                            + "\n" + "Expected Status Code: " + testData.testStatusCode))
//                    .setStatus(io.qameta.allure.model.Status.PASSED);
//
//            lifecycle.startStep(uuid_step_3, stepResult_3);
//            AllureReportServer.logStepMessage(formatter(responseDetails));
//            lifecycle.stopStep();

        } else {
            test.log(Status.FAIL, MarkupHelper.createLabel(testResult, ExtentColor.BLUE));
            totalFailedNodes++;

//            result.setStatusDetails(new StatusDetails().setMessage("Actual Status Code: " + response.getStatusCode()
//                            + "\n" + "Expected Status Code: " + testData.testStatusCode))
//                    .setStatus(io.qameta.allure.model.Status.FAILED);
//
//            String uuid_step_3 = "step-3";
//            StepResult stepResult_3 = new StepResult()
//                    .setName("Validation Details")
//                    .setStatusDetails(new StatusDetails().setMessage("Actual Status Code: " + response.getStatusCode()
//                            + "\n" + "Expected Status Code: " + testData.testStatusCode))
//                    .setStatus(io.qameta.allure.model.Status.FAILED); // Set the status as needed
//
//            lifecycle.startStep(uuid_step_3, stepResult_3);
//            AllureReportServer.logStepMessage(formatter(responseDetails));
//            lifecycle.stopStep();
        }

        System.out.println("Completed-testcase#" + totalNodes
                + "---Expected---" + testData.testStatusCode
                + "---Actual---" + response.getStatusCode());
    }

    public static Response sendRequest(Values values, Flags flags, ExtentTest test) {

        RequestSpecification request = RestAssured.given();

        Map<String, Object> requestDetails = new LinkedHashMap<>();

        if (flags.baseUrl) {
            request.baseUri(values.baseUrl);
            requestDetails.put("hostUri", values.baseUrl);
        }
        if (flags.endpoint) {
            request.basePath(values.endpoint);
            requestDetails.put("endpoint", values.endpoint);
        }
        if (flags.queryParams) {
            request.queryParams(values.queryParams);
            requestDetails.put("queryParams", values.queryParams);
        }
        if (flags.headers) {
            request.headers(values.headers);
            requestDetails.put("headers", values.headers);
        }
        if (flags.bodyObject) {
            request.body(values.bodyObject);
            requestDetails.put("body", values.bodyObject);
        }
        request.contentType("application/json");

        System.out.println(formatter(requestDetails));

        test.info("Request Details-" + "<pre>" + formatter(requestDetails) + "</pre>");

//        String uuid_step = "step-1";
//        StepResult stepResult = new StepResult()
//                .setName("Request Details")
//                .setStatus(io.qameta.allure.model.Status.PASSED); // Set the status as needed
//
//        lifecycle.startStep(uuid_step, stepResult);
//        AllureReportServer.logStepMessage(formatter(requestDetails));
//        lifecycle.stopStep();

        switch (values.requestType.toLowerCase()) {
            case "get":
                return request.get();
            case "post":
                return request.post();
            case "patch":
                return request.patch();
            case "delete":
                return request.delete();
        }
        return null;
    }

    public static String formatter(Map<String, Object> data) {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString;
        try {
            jsonString = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(data);
//            System.out.println(jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static void splitUrl(String uriString, Values values, Flags flags) {
        String query = "";

        try {
            URI uri = new URI(uriString);
            String port = uri.getPort() == -1 ? "" : ":" + String.valueOf(uri.getPort());
            values.baseUrl = uri.getScheme() + "://" + uri.getHost() + port;
            values.endpoint = uri.getPath();
            query = uri.getQuery();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        flags.baseUrl = values.baseUrl.length() > 0 ? true : false;
        flags.endpoint = values.endpoint.length() > 0 ? true : false;
        splitQuery(query, values, flags);
    }

    public static void splitQuery(String query, Values values, Flags flags) {
        if (null != query && query.length() > 0) {
            values.queryParams = new HashMap<>();
            String[] pairs = query.split("&");
            for (String pair : pairs) {
                String[] keyValue = pair.split("=");
                if (keyValue.length == 2) {
                    String key = keyValue[0];
                    String value = keyValue[1];
                    values.queryParams.put(key, value);
                }
            }
            flags.queryParams = true;
        } else {
            flags.queryParams = false;
        }
    }
}

