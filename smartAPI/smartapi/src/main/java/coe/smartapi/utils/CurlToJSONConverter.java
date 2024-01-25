package coe.smartapi.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

public class CurlToJSONConverter {

    public static String prettyPrintJSON(Object jsonObject) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        return gson.toJson(jsonObject);
    }

    public static Map<String, Object> parser(String curlCommand) {

        System.out.println(curlCommand);
        try {
            curlCommand = URLDecoder.decode(curlCommand, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        curlCommand = curlCommand.replace("\\", "");
        curlCommand = curlCommand.replace("\n", "");
        curlCommand = curlCommand.replace("  ", " ");

        System.out.println(curlCommand);

        String[] commandParts = curlCommand.split("'");

        if (commandParts[0].contains("-X")) return swaggerParser(curlCommand);
        else postmanParser(curlCommand);

        return null;
    }

    public static Map<String, Object> swaggerParser(String curlCommand) {

        Map<String, Object> parsedData = new HashMap<>();
        Map<String, Object> headersData = new HashMap<>();

        String[] commandParts = curlCommand.split("'");

        for (int i = 0; i < commandParts.length; i++) {
            switch (commandParts[i].trim()) {
                case "curl -X":
                    parsedData.put("method", commandParts[++i]);
                    break;
                case "":
                    parsedData.put("url", commandParts[++i]);
                    break;
                case "-H":
                    String[] headerParts = commandParts[++i].split(": ");
                    headersData.put(headerParts[0], headerParts[1]);
                    parsedData.put("headers", headersData);
                    break;
                case "-d":
                    parsedData.put("data", commandParts[++i]);
                    break;
            }
        }

        System.out.println(prettyPrintJSON(parsedData));

        return parsedData;
    }

    public static Map<String, Object> postmanParser(String curlCommand) {

        Map<String, Object> parsedData = new HashMap<>();
        Map<String, Object> headersData = new HashMap<>();

        String[] commandParts = curlCommand.split("'");

        for (int i = 0; i < commandParts.length; i++) {
            switch (commandParts[i]) {
                default:
                    if (commandParts[i].contains("curl --location --request ")) {
                        String[] methodParts = commandParts[i].split(" ");
                        parsedData.put("method", methodParts[methodParts.length - 1]);
                        parsedData.put("url", commandParts[++i].trim());
                    }
                    break;
                case " ":
                    parsedData.put("url", commandParts[++i]);
                    break;
                case " --header ":
                    String[] headerParts = commandParts[++i].split(": ");
                    headersData.put(headerParts[0], headerParts[1]);
                    parsedData.put("headers", headersData);
                    break;
                case " --data-raw ":
                    parsedData.put("data", commandParts[++i]);
                    break;
            }
        }

        System.out.println(prettyPrintJSON(parsedData));

        return parsedData;
    }
}
