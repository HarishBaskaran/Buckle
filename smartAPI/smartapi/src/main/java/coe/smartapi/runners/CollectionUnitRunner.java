package coe.smartapi.runners;

import coe.smartapi.model.ChangeSummary;
import coe.smartapi.model.Output;
import coe.smartapi.model.QueryParamsOutput;
import coe.smartapi.model.RequestModel;
import coe.smartapi.model.request.Request;
import coe.smartapi.model.request.Result;
import coe.smartapi.model.TestCases;
import coe.smartapi.model.runners.Flags;
import coe.smartapi.model.runners.Values;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

public class CollectionUnitRunner {

    private static final ObjectMapper objectMapper = new ObjectMapper();
    public static RequestModel runnerData = new RequestModel();
    static List<TestCases> testCases = new ArrayList<>();
    static List<Response> testCasesResponse = new LinkedList<>();

    public static void clearMemory() {
        runnerData = new RequestModel();
        testCases = new ArrayList<>();
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
            testData.testPositive = (Map<String, Object>) element.getEntity();
            testData.testStatusCode = element.getStatusCode();
            testData.testUrl = runnerData.getUrl();

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
                    result.getSingleQueryTestOutput()){
                queryParamsOutputs.add(queryParamsOutput);
            }

            for (QueryParamsOutput queryParamsOutput :
                    result.getMultiQueryTestOutput()){
                queryParamsOutputs.add(queryParamsOutput);
            }

            model.setQueryParamsOutput(queryParamsOutputs);

            List<Output> outputs = new ArrayList<>();
            for (Output output :
                    result.getSingleBodyTestOutput()){
                outputs.add(output);
            }

            for (Output output :
                    result.getMultiBodyTestOutput()){
                outputs.add(output);
            }

            model.setOutput(outputs);

        return model;

    }


    public static void mainRunner(String folderName) {
        File[] files = searchCollections(folderName);

        List<Request> requests = convertFilesToRequests(files);

        for (Request request : requests){

            clearMemory();
            runnerData = createRequestModel(request);
            extractTestCases();
            System.out.println(testCases.size()); // always - 1

            runner(testCases.get(0));

        }

    }

    public static List<Request> convertFilesToRequests(File[] files) {
        objectMapper.configure(SerializationFeature.INDENT_OUTPUT, false);
        List<Request> requests = new ArrayList<>();

        for (File file : files) {
            if (file.isFile()) {
                try {
                    Request request = objectMapper.readValue(file, Request.class);
                    requests.add(request);
                } catch (IOException e) {
                    System.err.println("Failed to convert file to Request: " + file.getAbsolutePath());
                    e.printStackTrace();
                }
            }
        }

        return requests;
    }

    public static File[] searchCollections(String folderName){
        // Specify the directory path
        String directoryPath = System.getProperty("user.dir") + "/collections/"
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

    @DataProvider(name = "defaultDataProvider", parallel = false)
    public static Object[][] dataProvider() {

        Object[][] testData = new Object[testCases.size()][1];

        for (int i = 0; i < testCases.size(); i++) {
            Object[] testcase = new Object[2];
            testcase[0] = testCases.get(i).testName;
            testcase[1] = testCases.get(i);
            testData[i][0] = testCases.get(i);
        }

        return testData;
    }

    @Test(dataProvider = "defaultDataProvider", threadPoolSize = 4)
    public static void runner(TestCases testData) {

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

        Response response = sendRequest(values, flags);
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


        String testResult = "Actual Status Code: " + response.getStatusCode()
                + " &nbsp; <br /> &nbsp; " + " &nbsp; <br /> &nbsp; "
                + "Expected Status Code: " + testData.testStatusCode;


    }

    public static Response sendRequest(Values values, Flags flags) {

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

