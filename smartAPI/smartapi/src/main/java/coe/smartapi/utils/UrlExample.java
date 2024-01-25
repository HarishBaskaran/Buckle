package coe.smartapi.utils;

import java.net.URI;
import java.net.URISyntaxException;

public class UrlExample {

    public static String pathParamReplacer(String url, String param, Object value) {
        return url.replaceAll(param, (String) value);
    }

    public static String  queryParamReplacer(String urlString, String qpKey, Object qpValue) {
        try {
            // Parse the URL
            URI uri = new URI(urlString);

            // Get the query parameters
            String query = uri.getQuery();

            // Split the query parameters into key-value pairs
            String[] queryParams = query.split("&");

            // Find and replace the desired key
            String updatedQuery = "";
            for (String param : queryParams) {
                String[] keyValue = param.split("=");
                String key = keyValue[0];
                Object value = keyValue[1];

                // Change the key if it matches
                if (key.equals(qpKey)) {
                    value = qpValue;
                }

                // Reconstruct the query parameters
                updatedQuery += key + "=" + value + "&";
            }

            // Remove the trailing '&' character
            if (updatedQuery.endsWith("&")) {
                updatedQuery = updatedQuery.substring(0, updatedQuery.length() - 1);
            }

            // Update the URI with the modified query
            URI updatedUri = new URI(uri.getScheme(), uri.getAuthority(), uri.getPath(), updatedQuery, uri.getFragment());

            // Get the updated URL string
            String updatedUrlString = updatedUri.toString();
//            System.out.println(updatedUrlString);
            return  updatedUrlString;
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        return urlString;
    }

    public static Object  queryParamValueFetcher(String urlString, String qpKey) {
        try {

            URI uri = new URI(urlString);
            String query = uri.getQuery();
            String[] queryParams = query.split("&");

            for (String param : queryParams) {
                String[] keyValue = param.split("=");
                String key = keyValue[0];
                Object value = keyValue[1];

                if (key.equals(qpKey)) {
                     return value ;
                }
            }

        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        return null;
    }
}

