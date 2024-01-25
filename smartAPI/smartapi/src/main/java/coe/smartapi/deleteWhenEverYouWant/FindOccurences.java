package coe.smartapi.deleteWhenEverYouWant;

import java.util.*;

public class FindOccurences {
    public static void main(String[] args) {

        String inputString = "This lambda expression simplifies the logic for counting character occurrences while using the compute method of the map. The output will be the same as in the previous example, showing character occurrences in the input string.";

        long start = System.currentTimeMillis();
//        usingVectors(inputString);
        usingMaps(inputString);
        long end = System.currentTimeMillis();

        System.out.println(end - start);
    }

    public static void usingMaps(String inputString) {

        Set<Character> characters = new LinkedHashSet<>();
        Map<Character, Integer> occurences = new LinkedHashMap<>();

        for (char c : inputString.toLowerCase().toCharArray())
            if (characters.add(c))
                occurences.put(c, 1);
            else
                occurences.put(c, occurences.get(c) + 1);

        occurences.forEach((k, v) -> System.out.println(k + "=" + v));
    }

    public static void usingVectors(String inputString) {

        Set<Character> characters = new LinkedHashSet<>();
        for (char c : inputString.toLowerCase().toCharArray()) characters.add(c);

        Vector<Character> characterVector = new Vector<>(characters);
        Vector<Integer> occurenceVector = new Vector<>(Collections.nCopies(characters.size(), 0));

        for (int i = 0; i < inputString.toLowerCase().length(); i++)
            for (int j = 0; j < characterVector.size(); j++)
                if (characterVector.get(j).equals(inputString.toLowerCase().charAt(i)))
                    occurenceVector.set(j, occurenceVector.get(j) + 1);

        for (int i = 0; i < characterVector.size(); i++)
            System.out.println(characterVector.get(i) + " = " + occurenceVector.get(i));

    }
}
