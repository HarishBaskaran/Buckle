package coe.smartapi.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.Option;
import com.jayway.jsonpath.spi.json.JacksonJsonProvider;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;
import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;

public class JsonPathExample {
    public static String jsonpathReplacer(String json, String path, Object value) {

        // Configure JSONPath to use JacksonJsonProvider
        Configuration configuration = Configuration.builder()
                .jsonProvider(new JacksonJsonProvider())
                .options(Option.DEFAULT_PATH_LEAF_TO_NULL)
                .build();

        // Parse the JSON
        Object document = configuration.jsonProvider().parse(json);

        // Update the value using JSONPath
        JsonPath.parse(document, configuration)
                .set(path, value);

        // Convert the updated document back to JSON
        return configuration.jsonProvider().toJson(document);
    }

    public static Object jsonpathSetterNew(Map<String, Object> json, String path, Object value) {
        // Configure JSONPath
        Configuration configuration = Configuration.defaultConfiguration();

        // Convert the Map to a JSON object
        Object document = JsonPath.using(configuration).parse(json).json();

        // Set the value using JSONPath
        JsonPath.parse(document).set(path, value);

        Map<String, Object> json1 = new HashMap<>();
        json1.putAll(JsonPath.read(document, "$"));

        return json1;
    }

    public static Object jsonpathGetter(Map<String, Object> json, String path) {

        Configuration configuration = Configuration.defaultConfiguration();
        Object document = JsonPath.using(configuration).parse(json).json();

        return JsonPath.read(document, path);
    }

    public static void main(String[] args) {
        System.out.println(environmentValueGetter("1"));
    }

    public static Object environmentValueGetter(String targetColumn1Value) {

        try {
            File file = new File("environment.json");

            // Read the JSON content from the file
            FileReader reader = new FileReader(file);
            char[] buffer = new char[(int) file.length()];
            reader.read(buffer);
            reader.close();

            String jsonData = new String(buffer);

            // Parse the JSON array
            JSONArray jsonArray = new JSONArray(jsonData);

            // Search for the JSON object with column1 equal to targetColumn1Value
            JSONObject resultObject = null;
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
//                System.out.println(jsonObject.get("column1"));
//                System.out.println(jsonObject.get("column1").getClass());
                if (jsonObject.get("column1").equals(targetColumn1Value)) {
//                    System.out.println("entered");
                    resultObject = jsonObject;
                    break;
                }
            }

            // If the resultObject is not null, print the corresponding column2 value
            if (resultObject != null) {
                Object column2Value = resultObject.get("column2");
                return column2Value;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

}


