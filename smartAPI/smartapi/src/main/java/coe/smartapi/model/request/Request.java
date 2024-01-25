package coe.smartapi.model.request;

import coe.smartapi.model.request.parsed.ParsedPositiveData;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class Request {
    private String filename;
    @JsonProperty("HTTP_Method")
    private HttpMethod HTTP_Method;
    private String url;
    private Map<String, Object> headers;
    private Map<String, Object> positive;
    private ParsedPositiveData parsedPositiveData;

    private List<Object> singleTestConfig;
    private List<Object> singleQueryTestConfig;
    private List<Object> multiTestConfig;
    private List<Object> multiQueryTestConfig;

    private List<String> multiHeaders;
    private List<String> queryMultiHeaders;

    private List<List<Object>> configEntries;

    private Result result;

    private List<Object> changeSummary;
    private List<Object> changeQuerySummary;
    private List<Object> multiChangeSummary;
    private List<Object> multiChangeQuerySummary;

    private List<PreRequestConfig> preRequest;
    private List<Object> pathParams;
}
