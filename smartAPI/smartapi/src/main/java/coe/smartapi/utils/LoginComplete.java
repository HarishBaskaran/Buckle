package coe.smartapi.utils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.*;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class LoginComplete {

    public static void mainFileWriter(Map<String, Object> args) {

//        for (Map.Entry<String, Object> entry : args.entrySet()) {
//            String key = entry.getKey();
//            Object value = entry.getValue();
//            System.out.println("Key: " + key + ", Value: " + value);
//        }

        String filePath = "environment.json";
        JSONArray jsonArray = readJsonArrayFromFile(filePath);
        Set<String> existingColumn1Values = extractColumn1Values(jsonArray);

        for (Map.Entry<String, Object> entry : args.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            updateIfExists(jsonArray, existingColumn1Values, key, (String) value);
        }

        writeJsonArrayToFile(jsonArray, filePath);
        System.out.println("Updated JSON content: " );
//        System.out.println("Updated JSON content: " + jsonArray.toString(2));
    }

    private static void updateIfExists(JSONArray jsonArray, Set<String> existingColumn1Values, String column1, String column2) {
        if (existingColumn1Values.contains(column1)) {
            // Update the "column2" value for the existing "column1"
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObject = jsonArray.getJSONObject(i);
                if (jsonObject.has("column1") && jsonObject.getString("column1").equals(column1)) {
                    jsonObject.put("column2", column2);
                    break;
                }
            }
        } else {
            // Add a new object for the new "column1"
            JSONObject newObj = new JSONObject();
            newObj.put("column1", column1);
            newObj.put("column2", column2);
            newObj.put("id", getNextId(jsonArray));
            jsonArray.put(newObj);
        }
    }

    private static JSONArray readJsonArrayFromFile(String filePath) {
        JSONArray jsonArray = new JSONArray();
        try (FileReader fileReader = new FileReader(filePath);
             BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            String line;
            StringBuilder jsonContent = new StringBuilder();
            while ((line = bufferedReader.readLine()) != null) {
                jsonContent.append(line);
            }
            jsonArray = new JSONArray(jsonContent.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonArray;
    }

    private static void writeJsonArrayToFile(JSONArray jsonArray, String filePath) {
        try (FileWriter fileWriter = new FileWriter(filePath);
             BufferedWriter bufferedWriter = new BufferedWriter(fileWriter)) {
            bufferedWriter.write(jsonArray.toString(2));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static int getNextId(JSONArray jsonArray) {
        // Find the maximum "id" value in the existing JSON array
        int maxId = 0;
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            if (jsonObject.has("id")) {
                int currentId = jsonObject.getInt("id");
                if (currentId > maxId) {
                    maxId = currentId;
                }
            }
        }
        return maxId + 1;
    }

    private static Set<String> extractColumn1Values(JSONArray jsonArray) {
        Set<String> column1Values = new HashSet<>();
        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject jsonObject = jsonArray.getJSONObject(i);
            if (jsonObject.has("column1")) {
                String column1Value = jsonObject.getString("column1");
                column1Values.add(column1Value);
            }
        }
        return column1Values;
    }
}

