package com.example.demo;

import java.util.*;

public class rough {

    public static void main(String[] args) {

        String a = "GEEKSFORGEEKS";
        String b = "ESORFKEE";


        Vector<Character> characters = new Vector<>();
        for (int i = 0; i < a.length(); i++)
            characters.add(i, a.charAt(i));


        TreeSet<Integer> answer = new TreeSet<>();
        for (char c : b.toCharArray())
            if (answer.add(characters.indexOf(c)))
                characters.set(characters.indexOf(c), '%');


        answer.forEach(x -> System.out.print(x + ","));
        System.out.println();

        if (answer.contains(-1)) System.out.println("String Not found");
        else System.out.println(a.substring(Collections.min(answer), Collections.max(answer) + 1));

        System.out.println(characters.indexOf('#'));
    }
}
