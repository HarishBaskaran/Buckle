package utils;

import java.io.*;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

public class Faker {

    private static String filePath = System.getProperty("user.dir") + "/logs/phoneNumbers.txt";

    public static void dummy(String json){
        System.out.println(json.toString());
    }

    public static String getPhoneNumber() {

        String phoneNumber = generateUniquePhoneNumber();
        return phoneNumber;
    }

    public static String getPhoneNumberUsingFaker() {
        String phoneNumber = new com.github.javafaker.Faker().phoneNumber().cellPhone().toString();
        phoneNumber = phoneNumber.replace("(", "");
        phoneNumber = phoneNumber.replace(")", "");
        phoneNumber = phoneNumber.replace(" ", "");
        phoneNumber = phoneNumber.replace(".", "");
        phoneNumber = phoneNumber.replace("-", "");
        return ("9" + phoneNumber.substring(0, 9));
    }

    public static String generateUniquePhoneNumber() {
        String phoneNumber;
        Set<String> existingPhoneNumbers = readExistingPhoneNumbers();

        do {
            phoneNumber = generateRandomPhoneNumber();
        } while (existingPhoneNumbers.contains(phoneNumber));

        appendPhoneNumberToFile(phoneNumber);

        return phoneNumber;
    }

    private static String generateRandomPhoneNumber() {
        Random random = new Random();
        StringBuilder phoneNumber = new StringBuilder("9");

        for (int i = 0; i < 9; i++) {
            phoneNumber.append(random.nextInt(10));
        }

        return phoneNumber.toString();
    }

    private static Set<String> readExistingPhoneNumbers() {
        Set<String> phoneNumbers = new HashSet<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                phoneNumbers.add(line.trim());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return phoneNumbers;
    }

    private static void appendPhoneNumberToFile(String phoneNumber) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath, true))) {
            writer.write(phoneNumber);
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
