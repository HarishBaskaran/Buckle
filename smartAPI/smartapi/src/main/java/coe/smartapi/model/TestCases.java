package coe.smartapi.model;

import coe.smartapi.model.request.PreRequestConfig;

import java.util.List;
import java.util.Map;

public class TestCases {
    public String testName;
    public String testMethod;
    public String testUrl;
    public Map<String, Object> testPositive;
    public Map<String, Object> testHeaders;
    public int testStatusCode;
    public String testResponse;
    public List<ChangeSummary> changeSummary;
    public List<PreRequestConfig> preRequest;
    public Object testResult;
}
