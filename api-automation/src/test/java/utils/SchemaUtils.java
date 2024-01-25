package utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.fge.jackson.JsonLoader;
import com.github.fge.jsonschema.core.report.ProcessingReport;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileReader;
import java.io.IOException;

public class SchemaUtils {

    private static final Logger logger = LoggerFactory.getLogger(SchemaUtils.class);

    public static boolean compareResponseSchema(String json, String schema) throws Exception {
        JsonNode schemaNode = JsonLoader.fromString(schema);
        JsonSchemaFactory factory = JsonSchemaFactory.byDefault();
        JsonSchema jsonSchema = factory.getJsonSchema(schemaNode);
        JsonNode jsonNode = JsonLoader.fromString(json);
        ProcessingReport report = jsonSchema.validate(jsonNode);
        logger.debug("report: {}", report);
        return report.isSuccess();
    }

    public static boolean compareResponseBody(String response, String schema) {

        JsonParser parser = new JsonParser();
        JsonElement o1 = parser.parse(response);
        JsonElement o2 = parser.parse(schema);

        return o1.equals(o2);
    }

    public static JSONObject reader(String filePath) {

        JSONParser parser = new JSONParser();
        JSONObject jsonObject = null;

        try {
            jsonObject = (JSONObject) parser.parse(new FileReader(filePath));
        } catch (IOException | ParseException exception) {
            System.out.println(exception.getMessage());
        }
            return jsonObject;

    }

}

