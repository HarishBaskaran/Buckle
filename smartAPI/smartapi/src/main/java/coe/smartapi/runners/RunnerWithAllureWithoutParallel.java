package coe.smartapi.runners;

import coe.smartapi.model.*;
import coe.smartapi.model.runners.Flags;
import coe.smartapi.model.runners.Values;
import coe.smartapi.utils.AllureReporting;
import coe.smartapi.utils.UrlExample;
import coe.smartapi.model.request.PreRequestConfig;
import coe.smartapi.utils.AllureReportServer;
import coe.smartapi.utils.JsonPathExample;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.qameta.allure.Allure;
import io.qameta.allure.AllureLifecycle;
import io.qameta.allure.model.*;
import org.json.JSONObject;
import io.restassured.response.Response;

import java.util.Map;
import java.util.*;

import static coe.smartapi.runners.RunnerUtils.formatter;

public class RunnerWithAllureWithoutParallel {

    public static RequestModel runnerData = new RequestModel();
    static List<TestCases> testCases = new ArrayList<>();
    public static List<TestCases> testResults = new ArrayList<>();

    public static String collectionName;
    public static String requestName;

    private static AllureLifecycle lifecycle;
    static String childUuid = "RequestRun";
    static String childName = "RequestRun";

    static String childUuid2;
    static String childName2;

    static String uuid_test;
    static String name_test;

    static int testcaseCount = 1;

    public static void clearMemory() {
        runnerData = new RequestModel();
        testCases = new ArrayList<>();
        testcaseCount = 1;
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
            testData.preRequest = runnerData.getPreRequest();
            testData.changeSummary = element.getChangeSummary();

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
            testData.testResponse = element.getResponse();
            testData.testUrl = runnerData.getUrl();
            testData.preRequest = runnerData.getPreRequest();
            testData.changeSummary = element.getChangeSummary();

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

    public static void runnerMain() {
        beforeSuite();

        Object[][] testcases = dataProvider();

        for (Object[] testcase : testcases) {
            runner((TestCases) testcase[0]);
            afterTest();
        }
        afterSuite();
    }

    public static Object[][] dataProvider() {

        childUuid = collectionName;
        childName = collectionName;
        new AllureReporting(lifecycle).startContainer(childUuid, childName);

        childUuid2 = requestName;
        childName2 = requestName != "Request Run" ? requestName : testCases.get(0).testMethod + "-" + testCases.get(0).testUrl;
        new AllureReporting(lifecycle).startChildContainer(childUuid, childUuid2, childName2);

        Object[][] testData = new Object[testCases.size()][1];

        for (int i = 0; i < testCases.size(); i++) {
            Object[] testcase = new Object[2];
            testcase[0] = testCases.get(i).testName;
            testcase[1] = testCases.get(i);
            testData[i][0] = testCases.get(i);
        }

        return testData;
    }

    public static void beforeSuite() {
        CollectionRunner.deleteFilesInFolder("./allure-results");
        lifecycle = Allure.getLifecycle();
    }

    public static void afterTest() {
        new AllureReporting(lifecycle).stopTestCase(uuid_test);
    }

    public static void afterSuite() {
        new AllureReporting(lifecycle).stopContainer(childUuid2);
        new AllureReporting(lifecycle).stopContainer(childUuid);

        System.out.println("Runner preparing Allure reports");
        AllureReportServer.main(null);
    }

    public static void runner(TestCases testData) {

        uuid_test = testData.testName;
        name_test = testData.testName;

        TestResult result = new AllureReporting(lifecycle).startTestCase(uuid_test, name_test);
        result = new AllureReporting(lifecycle).setLabels(result, childName, childName2);

        Values values = new Values();
        Flags flags = new Flags();

        System.out.println(testData.testUrl);

        RunnerUtils.splitUrl(testData.testUrl, values, flags);

        values.requestType = testData.testMethod;
        if (testData.testHeaders.size() > 0) {
            values.headers = testData.testHeaders;
            flags.headers = true;
        }
        if (testData.testPositive.size() > 0) {
            values.bodyObject = testData.testPositive;
            flags.bodyObject = true;
        }

        Response response = RunnerUtils.sendRequest(lifecycle, values, flags);

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
        testData.testResult = (responseDetails);
        testResults.add(testData);

        String testResult = "Actual Status Code: " + response.getStatusCode()
                + "\n"
                + "Expected Status Code: " + testData.testStatusCode;

        if (response.getStatusCode() == testData.testStatusCode) {
            new AllureReporting(lifecycle)
                    .step("step-3", "Validation Details", testResult, Status.PASSED, "");
        }
        else {
            new AllureReporting(lifecycle).updateStatus(result, Status.FAILED, testResult);
            new AllureReporting(lifecycle)
                    .step("step-3", "Validation Details", testResult, Status.FAILED, "");
        }

        System.out.println(testData.testResponse);
        System.out.println(response.getBody().asString());

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
                            .step("step-4",
                                    "Response Content Details",
                                    "Response body is not JSON",
                                    Status.FAILED,
                                    ""
                            );
                }
            } else {
                if (null != response.getBody().asString() && response.getBody().asString().contains(testData.testResponse)) {
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

        System.out.println("completed testcase " + testcaseCount++);


    }
}

