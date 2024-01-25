package coe.smartapi.model.request.parsed;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ParsedPositiveData {
    private Map<String, Object> instance;
    private boolean json;
    private List<String> index;
    private List<String> jsonPaths;
    private List<Environment> environment;
    private Map<String, Object> summary;
    private Map<String, Object> body;
    private List<Object> testData;
    private List<Object> multiTestData;

    // Constructors, getters, and setters
}