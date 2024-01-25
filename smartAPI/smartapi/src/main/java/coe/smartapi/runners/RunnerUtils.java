package coe.smartapi.runners;

import coe.smartapi.model.runners.Flags;
import coe.smartapi.model.runners.Values;
import coe.smartapi.utils.AllureReporting;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.qameta.allure.AllureLifecycle;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class RunnerUtils {

    public static boolean isJson(String str) {
        try {
            new JSONObject(str);
            return true;
        } catch (JSONException e) {
            return false;
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

        if(null != lifecycle)
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
