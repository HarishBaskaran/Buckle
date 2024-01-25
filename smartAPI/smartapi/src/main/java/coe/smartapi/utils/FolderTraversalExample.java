package coe.smartapi.utils;

import coe.smartapi.controllers.DirectoryController;
import coe.smartapi.model.CollectionModel;
import lombok.Data;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;


public class FolderTraversalExample {

    static List<CollectionModel> collectionsList = new LinkedList<>();

    public static Map<String, List<CollectionModel>> getCollectionsList() {
        collectionsList = new LinkedList<>();
        File currentDir = new File(new DirectoryController().directoryControllerPath);
        List<CollectionModel> collections = displayDirectory(currentDir);

        // Step 1: Filter the list to get directory objects
        List<CollectionModel> directories = collections.stream()
                .filter(CollectionModel::isDirectory)
                .collect(Collectors.toList());

        // Step 2: Extract the paths and names from the directory objects
        Map<String, String> directoryPathsAndNames = directories.stream()
                .collect(Collectors.toMap(CollectionModel::getPath, CollectionModel::getName));

        // Step 3: Filter the remaining objects based on the directory paths
        List<CollectionModel> filteredFiles = collections.stream()
                .filter(collection -> !collection.isDirectory() && matchesDirectoryPath(collection, directoryPathsAndNames.keySet()))
                .collect(Collectors.toList());

        // Step 4: Group the filtered files by the directory name
        Map<String, List<CollectionModel>> groupedCollections = new HashMap<>();
        Set<String> directoryPaths = directoryPathsAndNames.keySet(); // Unique directory paths

        for (CollectionModel file : filteredFiles) {
            String directoryPath = findMatchingDirectoryPath(file, directoryPaths);
            String directoryName = directoryPathsAndNames.get(directoryPath);
            groupedCollections.computeIfAbsent(directoryName, k -> new ArrayList<>()).add(file);
        }

        // Step 5: Add directories without files to the groupedCollections map
        for (String directoryPath : directoryPaths) {
            String directoryName = directoryPathsAndNames.get(directoryPath);
            groupedCollections.putIfAbsent(directoryName, new ArrayList<>());
        }

//        printGroupedCollections(groupedCollections);

        return groupedCollections;
    }

    private static void printGroupedCollections(Map<String, List<CollectionModel>> groupedCollections) {
        for (Map.Entry<String, List<CollectionModel>> entry : groupedCollections.entrySet()) {
            System.out.println("Group: " + entry.getKey());
            System.out.println("==============================");
            List<CollectionModel> models = entry.getValue();
            for (CollectionModel model : models) {
//                System.out.println("Directory: " + model.isDirectory());
                System.out.println("Name: " + model.getName());
//                System.out.println("Path: " + model.getPath());
//                System.out.println("----------------------------");
            }
            System.out.println();
        }
    }


    private static boolean matchesDirectoryPath(CollectionModel file, Set<String> directoryPaths) {
        return directoryPaths.stream().anyMatch(file.getPath()::contains);
    }

    private static String findMatchingDirectoryPath(CollectionModel file, Set<String> directoryPaths) {
        return directoryPaths.stream()
                .filter(file.getPath()::contains)
                .findFirst()
                .orElse("");
    }

    public static List<CollectionModel> displayDirectory(File dir) {

        try {
            File[] files = dir.listFiles();

            for (File file : files) {
                if (file.isDirectory()) {
                    CollectionModel model = new CollectionModel();
                    model.setDirectory(true);
                    model.setName(file.getName());
                    model.setPath(file.getCanonicalPath());
                    collectionsList.add(model);

//                    System.out.println("directory:" + file.getCanonicalPath() + "-" + file.getName());
                    displayDirectory(file);
                } else {
                    CollectionModel model = new CollectionModel();
                    model.setDirectory(false);
                    model.setName(file.getName());
                    model.setPath(file.getCanonicalPath());
                    collectionsList.add(model);

//                    System.out.println("     file:" + file.getCanonicalPath()+ "-" + file.getName());
                }
            }
        }

        catch (IOException e) {
            e.printStackTrace();
        }

        return collectionsList;
    }
}

