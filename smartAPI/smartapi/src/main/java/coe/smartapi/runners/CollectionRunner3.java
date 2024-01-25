package coe.smartapi.runners;

import coe.smartapi.controllers.DirectoryController;
import coe.smartapi.model.*;
import coe.smartapi.model.request.PreRequestConfig;
import coe.smartapi.model.request.Request;
import coe.smartapi.model.request.Result;
import coe.smartapi.model.runners.Flags;
import coe.smartapi.model.runners.Values;
import coe.smartapi.utils.AllureReportServer;
import coe.smartapi.utils.AllureReporting;
import coe.smartapi.utils.JsonPathExample;
import coe.smartapi.utils.UrlExample;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import io.qameta.allure.Allure;
import io.qameta.allure.AllureLifecycle;
import io.qameta.allure.model.Status;
import io.qameta.allure.model.TestResult;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

public class CollectionRunner3 {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    public static RequestModel runnerData = new RequestModel();
    static List<TestCases> testCases = new ArrayList<>();
    static List<Response> testCasesResponse = new LinkedList<>();

    private static AllureLifecycle lifecycle = Allure.getLifecycle();

    public static void clearMemory() {
        runnerData = new RequestModel();
        testCases = new ArrayList<>();
        deleteFile();
    }

    public static void deleteFilesInFolder(String folderPath) {
        File folder = new File(folderPath);
        if (folder.exists() && folder.isDirectory()) {
            File[] files = folder.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile()) {
                        if (file.delete()) {
                            System.out.println("Deleted file: " + file.getName());
                        } else {
                            System.out.println("Failed to delete file: " + file.getName());
                        }
                    }
                }
            }
        } else {
            System.out.println("Invalid folder path or folder does not exist.");
        }
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
            testData.testResponse = element.getResponse();
            testData.testUrl = element.getEntity();
            testData.changeSummary = element.getChangeSummary();

            int j = 0;
            for (ChangeSummary summary : element.getChangeSummary()) {
                if (j > 0) {
                    testData.testName = testData.testName + "\n";
                    testData.testName = testData.testName + summary.getFieldName() + " from "
                            + summary.getOldFieldValue() + " to " + summary.getNewFieldValue();
                } else {
                    testData.testName = summary.getFieldName() + " from "
                            + summary.getOldFieldValue() + " to " + summary.getNewFieldValue();
                }
                j++;
            }
            testData.testName = testData.testName + "\n";
            testCases.add(i++, testData);
        }

        for (Output element : runnerData.getOutput()) {
            TestCases testData = new TestCases();
            testData.testMethod = runnerData.getMethod();
            testData.testHeaders = runnerData.getHeaders();
            testData.testPositive = element.getEntity();
            testData.testStatusCode = element.getStatusCode();
            testData.testUrl = runnerData.getUrl();
            testData.changeSummary = element.getChangeSummary();

            int j = 0;
            for (ChangeSummary summary : element.getChangeSummary()) {
                if (j > 0) {
                    testData.testName = testData.testName + "\n";
                    testData.testName = testData.testName + summary.getFieldName() + " from "
                            + summary.getOldFieldValue() + " to " + summary.getNewFieldValue();
                } else {
                    testData.testName = summary.getFieldName() + " from "
                            + summary.getOldFieldValue() + " to " + summary.getNewFieldValue();
                }
                j++;
            }
            testData.testName = testData.testName + "\n";
            testCases.add(i++, testData);
        }
    }

    public static RequestModel createRequestModel(Request request) {

        RequestModel model = new RequestModel();
        model.setMethod(request.getHTTP_Method().getLabel());
        model.setUrl(request.getUrl());
        model.setHeaders(request.getHeaders());
        model.setPositive(request.getPositive());

        List<QueryParamsOutput> queryParamsOutputs = new ArrayList<>();
        Result result = request.getResult();
        for (QueryParamsOutput queryParamsOutput :
                result.getSingleQueryTestOutput()) {
            queryParamsOutputs.add(queryParamsOutput);
        }

        for (QueryParamsOutput queryParamsOutput :
                result.getMultiQueryTestOutput()) {
            queryParamsOutputs.add(queryParamsOutput);
        }

        model.setQueryParamsOutput(queryParamsOutputs);

        List<Output> outputs = new ArrayList<>();
        for (Output output :
                result.getSingleBodyTestOutput()) {
            outputs.add(output);
        }

        for (Output output :
                result.getMultiBodyTestOutput()) {
            outputs.add(output);
        }

        model.setOutput(outputs);

        return model;

    }

    public static void mainRunner(String folderName) {

        File[] files = searchCollections(folderName);
        System.out.println("requests count - " + files.length);
        List<Request> requests = convertFilesToRequests(files);

        deleteFilesInFolder("./allure-results");
        new AllureReporting(lifecycle).startContainer(folderName, folderName);

        for (Request request : requests) {

            clearMemory();
            System.out.println(request.getFilename());

            new AllureReporting(lifecycle).startChildContainer(folderName, request.getFilename(), request.getFilename());

            runnerData = createRequestModel(request);
            extractTestCases();

            for (PreRequestConfig preRequestConfig : request.getPreRequest()) {
                String source = preRequestConfig.getSourceRequest().split("_")[0];
                String path = preRequestConfig.getSourceKey();
                Object value = "";

                switch (preRequestConfig.getSourceType().toLowerCase()) {
                    case "request headers":
                        value = JsonPathExample.jsonpathGetter(
                                requests.get(Integer.parseInt(source) - 1).getHeaders(), path);
                        break;
                    case "request body":
                        value = JsonPathExample.jsonpathGetter(
                                requests.get(Integer.parseInt(source) - 1).getPositive(), path);
                        break;
                    case "request query":
                        value = UrlExample.queryParamValueFetcher(
                                requests.get(Integer.parseInt(source) - 1).getUrl(), path);
                        break;

                    case "response headers":
                        value = JsonPathExample.jsonpathGetter(
                                getJsonFromResponse(testCasesResponse.get(Integer.parseInt(source) - 1),
                                        "headers"), path);
                        break;

                    case "response body":
                        value = JsonPathExample.jsonpathGetter(
                                getJsonFromResponse(testCasesResponse.get(Integer.parseInt(source) - 1),
                                        "body"), path);
                        break;

                    case "environment":
                        value = JsonPathExample.environmentValueGetter(path);
                        break;

                }

                for (TestCases testCase : testCases) {

                    Object updatedJson = "";
                    path = preRequestConfig.getDestKey();
                    if (null != testCase.changeSummary && testCase.changeSummary.contains(path)) {
                        continue;
                    }

                    switch (preRequestConfig.getDestType().toLowerCase()) {
                        case "request headers":
                            updatedJson = JsonPathExample.jsonpathSetterNew(
                                    testCase.testHeaders, path, value);
                            testCase.testHeaders = (Map<String, Object>) updatedJson;
                            break;
                        case "request body":
                            updatedJson = JsonPathExample.jsonpathSetterNew(
                                    testCase.testPositive, (path), value);
                            testCase.testPositive = (Map<String, Object>) updatedJson;
                            break;
                        case "request query":
                            updatedJson = UrlExample.queryParamReplacer(
                                    testCase.testUrl, path, value);
                            testCase.testUrl = (String) updatedJson;
                            break;
                        case "request pathparams":
                            updatedJson = UrlExample.pathParamReplacer(
                                    testCase.testUrl, path, value);
                            testCase.testUrl = (String) updatedJson;
                            break;

                    }

                }
            }

            for (TestCases testCase : testCases) {

                TestResult testResult = new AllureReporting(lifecycle).startTestCase(request.getFilename() + testCase.testName, testCase.testName);
                new AllureReporting(lifecycle).setLabels(testResult, folderName, request.getFilename());
                runner(testCase, testResult);
                new AllureReporting(lifecycle).stopTestCase(request.getFilename() + testCase.testName);

            }
            System.out.println("###############");

            new AllureReporting(lifecycle).stopContainer(request.getFilename());
        }

        new AllureReporting(lifecycle).stopContainer(folderName);
        AllureReportServer.main(null);
    }

    public static Map<String, Object> getJsonFromResponse(Response response, String type) {
        Map<String, Object> jsonHeaders = new HashMap<>();

        switch (type) {
            case "headers":
                for (io.restassured.http.Header header : response.getHeaders()) {
                    String headerName = header.getName();
                    String headerValue = header.getValue();
                    jsonHeaders.put(headerName, headerValue);
                }
                return jsonHeaders;
            case "body":
                String responseBody = response.asString();
                Gson gson = new Gson();
                Type mapType = new TypeToken<Map<String, Object>>() {
                }.getType();
                Map<String, Object> responseMap = gson.fromJson(responseBody, mapType);

                return (responseMap);
        }
        return null;
    }

    public static List<Request> convertFilesToRequests(File[] files) {
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, false);
        List<Request> requests = new ArrayList<>();

        for (File file : files) {
            if (file.isFile()) {
                try {
                    Request request = objectMapper.readValue(file, Request.class);
                    request.setFilename(file.getName());
                    requests.add(request);
                } catch (IOException e) {
                    System.err.println("Failed to convert file to Request: " + file.getAbsolutePath());
                    e.printStackTrace();
                }
            }
        }

        return requests;
    }

    public static File[] searchCollections(String folderName) {
        // Specify the directory path
        String directoryPath = new DirectoryController().directoryControllerPath
                + folderName;

        // Create a File object representing the directory
        File directory = new File(directoryPath);

        // Check if the directory exists
        if (directory.exists() && directory.isDirectory()) {
            // Get an array of files in the directory
            File[] files = directory.listFiles();
            return files;

        } else {
            System.out.println("Directory does not exist.");
        }

        return new File[0];
    }

    public static void runner(TestCases testData, TestResult result) {

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

        Response response = sendRequest(lifecycle, values, flags);
        testCasesResponse.add(response);

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


        new AllureReporting(lifecycle).step("step-2", "Response Details", formatter(responseDetails));

        String testResult = "Actual Status Code: " + response.getStatusCode()
                + "\n"
                + "Expected Status Code: " + testData.testStatusCode;

        if (response.getStatusCode() == testData.testStatusCode) {
            new AllureReporting(lifecycle)
                    .step("step-3", "Validation Details", testResult, Status.PASSED, "");
        } else {
            new AllureReporting(lifecycle).updateStatus(result, Status.FAILED, testResult);
            new AllureReporting(lifecycle)
                    .step("step-3", "Validation Details", testResult, Status.FAILED, "");
        }

        if (null != testData.testResponse && null != response.getBody().asString())
            if (RunnerUtils.isJson(testData.testResponse)) {
                if (RunnerUtils.isJson(response.getBody().asString())) {
                    JSONObject jsonObject = new JSONObject(response.getBody());
                    JSONObject jsonToCheck = new JSONObject(testData.testResponse);

                    boolean allKeysMatch = true;

                    for (String key : jsonToCheck.keySet()) {
                        if (!jsonObject.has(key) || !jsonObject.get(key).equals(jsonToCheck.get(key))) {
                            allKeysMatch = false;
                            break;
                        }
                    }

                    if (allKeysMatch) {
                        System.out.println("Response body contains the specified JSON keys and values.");
                        new AllureReporting(lifecycle)
                                .step("step-4", "Response Content Details", "Response body contains the specified JSON keys and values.", Status.PASSED,
                                        "");

                    } else {
                        System.out.println("Response body does not contain the specified JSON keys and values.");
                        new AllureReporting(lifecycle)
                                .step("step-4", "Response Content Details", "Response body does not contain the specified JSON keys and values.", Status.FAILED,
                                        "");

                    }
                } else {
                    System.out.println("Response body is not JSON");
                    new AllureReporting(lifecycle)
                            .step("step-4", "Response Content Details", "Response body is not JSON", Status.FAILED, ""
                            );
                }
            } else {
                if (response.getBody().asString().contains(testData.testResponse)) {
                    System.out.println("Response body contains the response string.");
                    new AllureReporting(lifecycle)
                            .step("step-4", "Response Content Details", "Response body contains the response string.", Status.PASSED, ""
                            );
                } else {
                    System.out.println("Response body does not contain the response string.");
                    new AllureReporting(lifecycle)
                            .step("step-4", "Response Content Details", "Response body does not contain the response string.", Status.FAILED,
                                    "");
                }
            }
    }

    public static Response sendRequest(AllureLifecycle lifecycle, Values values, Flags flags) {

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

        new AllureReporting(lifecycle).step("step-1", "Request Details", formatter(requestDetails));

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

