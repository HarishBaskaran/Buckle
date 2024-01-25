package coe.smartapi.runners;

import coe.smartapi.model.*;
import coe.smartapi.model.request.PreRequestConfig;
import coe.smartapi.model.runners.Flags;
import coe.smartapi.model.runners.Values;
import coe.smartapi.utils.AllureReportServer;
import coe.smartapi.utils.AllureReporting;
import coe.smartapi.utils.JsonPathExample;
import coe.smartapi.utils.UrlExample;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.qameta.allure.Allure;
import io.qameta.allure.AllureLifecycle;
import io.qameta.allure.model.Status;
import io.qameta.allure.model.TestResult;
import io.restassured.response.Response;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static coe.smartapi.runners.RunnerUtils.formatter;

public class RunnerWithoutParallelAndReport {

    public static RequestModel runnerData = new RequestModel();
    static List<TestCases> testCases = new ArrayList<>();
    public static List<TestCases> testResults = new ArrayList<>();

    static int testcaseCount = 1;

    public static void clearMemory() {
        runnerData = new RequestModel();
        testCases = new ArrayList<>();
        testResults = new ArrayList<>();
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
        Object[][] testcases = dataProvider();

        for (Object[] testcase : testcases)
            runner((TestCases) testcase[0]);
    }

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

    public static void runner(TestCases testData) {

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

        Response response = RunnerUtils.sendRequest(null, values, flags);

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

        System.out.println(testData.testResponse);
        System.out.println(response.getBody().asString());

        testData.testResult = (responseDetails);
        testResults.add(testData);

        System.out.println("completed sample run testcase " + testcaseCount++);
    }
}

