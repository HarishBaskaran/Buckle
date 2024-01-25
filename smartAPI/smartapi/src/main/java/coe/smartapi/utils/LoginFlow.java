package coe.smartapi.utils;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Method;
import io.restassured.response.Response;
import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.net.URLDecoder;
import java.io.UnsupportedEncodingException;

public class LoginFlow {

    Map<String, String> authConfigs = new HashMap<>();

    String authToken = null;

    String username = "hinduja@vivriticapital.com";
    String password = "Think@123";
    String environment = "";
    String productId = "CRDPL";

    String loginTicket = null;
    String auth0Token = null;

    String bearerToken = null;
    String userKey = null;
    String entityKey = null;
    String groupKey = null;
    String subgroups = null;
    String mfaToken = null;

    public LoginFlow(String username,
                     String password,
                     String environment
    ) {
        this.username = username;
        this.password = password;
        this.environment = environment;

    }

    public LoginFlow(String username,
                     String password,
                     String environment,
                     String productId) {
        this.username = username;
        this.password = password;
        this.environment = environment;
        this.productId = productId;

    }

    public void mainRunner(LoginFlow loginFlow) {
        System.out.println(username);
        System.out.println(password);
        System.out.println(environment);


        try {
            loginFlow.LoginFlowEnvironment();
            loginFlow.authenticate_options();
            loginFlow.authenticate();
            loginFlow.get_bearerToken();
            loginFlow.mfa_verify();

            String[] prefix = username.split("@");

            Map<String, Object> args = new HashMap<>();
            args.put(prefix[0] + "_bearer", "Bearer " +bearerToken);
            args.put(prefix[0] + "_mfa", mfaToken);
            args.put(prefix[0] + "_entity", entityKey);
            args.put(prefix[0] + "_group", groupKey);

            LoginComplete.mainFileWriter(args);

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void LoginFlowEnvironment() {
        Map<String, String> stagingConfig = new HashMap<>();
        stagingConfig.put("host_login", "https://pool-stg.credavenue.in");
        stagingConfig.put("host_auth", "https://auth.credavenue.in");
        stagingConfig.put("host_auth_mfa", "https://auth-stg-api.credavenue.in");
        stagingConfig.put("host_audience", "https://mp-api-stg.vivriti.in");
        stagingConfig.put("auth0Client", "eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMS4zIn0");
        stagingConfig.put("client_id", "8wX7KpwXzxugX1i7f0RHRLvbPxAtovra");

        Map<String, String> qaConfig = new HashMap<>();
        qaConfig.put("host_login", "https://pool-qa.credavenue.in");
        qaConfig.put("host_auth", "https://auth-qa.credavenue.in");
        qaConfig.put("host_auth_mfa", "https://auth-qa-api.credavenue.in");
        qaConfig.put("host_audience", "https://mp-api-stg.vivriti.in");
        qaConfig.put("auth0Client", "eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4xMC4wIn0=");
        qaConfig.put("client_id", "Kuo6v0ErWRTtXGtAF67Z4SNFBX7P22AZ");

        Map<String, String> perfConfig = new HashMap<>();
        perfConfig.put("host_login", "https://pool-perf-01.credavenue.in");
        perfConfig.put("host_auth", "https://vivriti-marketplace-perf.us.auth0.com");
        perfConfig.put("host_auth_mfa", "https://pool-perf-01-api.credavenue.in");
        perfConfig.put("host_audience", "https://pool-perf-01-api.credavenue.in");
        perfConfig.put("auth0Client", "yJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMS4zIn0=");
        perfConfig.put("client_id", "X6jQoSyscxjkVbfMH1VaI88JihwPnJ6E");

        Map<String, String> demoConfig = new HashMap<>();
        demoConfig.put("host_login", "https://pool-demo-01.credavenue.in");
        demoConfig.put("host_auth", "https://auth-demo.credavenue.in");
        demoConfig.put("host_auth_mfa", "https://auth-demo-01-api.credavenue.in");
        demoConfig.put("host_audience", "https://mp-api-dev.viviriti.in");
        demoConfig.put("auth0Client", "eyJuYW1lIjoiYXV0aDAtcmVhY3QiLCJ2ZXJzaW9uIjoiMS4xMC4xIn0=");
        demoConfig.put("client_id", "LbhwkBQl9AmGy6f9Cc4QxYwcKIOOpEzl");

        Map<String, String> sitConfig = new HashMap<>();
        sitConfig.put("host_login", "https://pool-stg.credavenue.in");
        sitConfig.put("host_auth", "https://auth.credavenue.in");
        sitConfig.put("host_auth_mfa", "https://auth-stg-api.credavenue.in");
        sitConfig.put("host_audience", "https://mp-api-stg.vivriti.in");
        sitConfig.put("auth0Client", "eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMS4zIn0");
        sitConfig.put("client_id", "8wX7KpwXzxugX1i7f0RHRLvbPxAtovra");


        switch (environment) {
            case "STAGING":
                authConfigs = stagingConfig;
                break;
            case "QA":
                authConfigs = qaConfig;
                break;
            case "PERF":
                authConfigs = perfConfig;
                break;
            case "DEMO":
                authConfigs = demoConfig;
                break;
            case "SIT":
                authConfigs = sitConfig;
                break;
        }


    }

    public void authenticate_options() throws UnsupportedEncodingException {

        String hostAuth = authConfigs.get("host_auth");
        String hostLogin = authConfigs.get("host_login");

        String uri = hostAuth + "/co/authenticate";
        String accessControlRequestHeaders = "auth0-client,content-type";
        String accessControlRequestMethod = "POST";
        String origin = hostLogin;
        String referer = hostLogin;

        System.out.println(uri);
        System.out.println(hostLogin);

        Response response = RestAssured.given()
                .header("access-control-request-headers", accessControlRequestHeaders)
                .header("access-control-request-method", accessControlRequestMethod)
                .header("origin", origin)
                .header("referer", referer)
                .request(Method.OPTIONS, uri);

        if (response.getStatusCode() != 204) {
            throw new RuntimeException(response.getBody().asString());
        }

        String setCookieHeader = response.getHeader("Set-Cookie");

        System.out.println(URLDecoder.decode(setCookieHeader, "UTF-8"));

        authToken = setCookieHeader.split(";")[0];
//        authToken = URLDecoder.decode(authToken, "UTF-8");

        authToken = "did=" + URLDecoder.decode(response.cookie("did"), "UTF-8");
        System.out.println("Authentication Token: " + authToken);

        System.out.println();
    }

    public void authenticate() {
        String hostAuth = authConfigs.get("host_auth");
        String hostLogin = authConfigs.get("host_login");
        String clientId = authConfigs.get("client_id");
        String auth0Client = authConfigs.get("auth0Client");

        String uri = hostAuth + "/co/authenticate";
        String realm = "Username-Password-Authentication";
        String credentialType = "http://auth0.com/oauth/grant-type/password-realm";

        Map<String, Object> payload = new HashMap<>();
        payload.put("client_id", clientId);
        payload.put("username", username);
        payload.put("password", password);
        payload.put("realm", realm);
        payload.put("credential_type", credentialType);

        Map<String, String> headers = new HashMap<>();
        headers.put("auth0-client", auth0Client);
        headers.put("cookie", authToken);
        headers.put("content-type", "application/json");
        headers.put("origin", hostLogin);
        headers.put("referer", hostLogin);

        Map<String, Object> request = new HashMap<>();
        request.put("uri", uri);
        request.put("payload", payload);
        request.put("headers", headers);

        Response response = RestAssured.given()
                .contentType(ContentType.JSON)
                .headers(headers)
                .body(payload)
                .request(Method.POST, uri);

//        System.out.println("authenticate-"+response.getStatusCode());
//        System.out.println(response.getBody().asString());

        if (response.getStatusCode() != 200) {
            throw new RuntimeException(response.getBody().asString());
        }

        loginTicket = response.getBody().jsonPath().get("login_ticket");
        String setCookieHeader = response.getHeader("Set-Cookie");
        String secondCookie = setCookieHeader.split(";")[0].trim();
        String extractedCookie = secondCookie.split("=")[1];
        auth0Token = "auth0=" + extractedCookie;

        System.out.println("Login Ticket: " + loginTicket);
        System.out.println("auth0Token: " + auth0Token);

        System.out.println(response.getBody().asString());
        System.out.println();
    }

    public void get_bearerToken() {

        String hostAuth = authConfigs.get("host_auth");
        String hostLogin = authConfigs.get("host_login");
        String clientId = authConfigs.get("client_id");
        String hostAudience = authConfigs.get("host_audience");
        String auth0Client = authConfigs.get("auth0Client");

        String url = hostAuth + "/authorize";

        Map<String, String> headers = new HashMap<>();
        headers.put("cookie", auth0Token);
        headers.put("referer", hostLogin);

        Map<String, Object> params = new HashMap<>();
        params.put("client_id", clientId);
        params.put("response_type", "token id_token");
        params.put("redirect_uri", hostLogin + "/login");
        params.put("realm", "Username-Password-Authentication");
        params.put("audience", hostAudience);
        params.put("state", "a3zLxrTgKzMbfCpogTcLThpdkq9UB085");
        params.put("nonce", "N8BIvrzAORlwoAL6Vedw1GMfJevPrgUR");
        params.put("login_ticket", loginTicket);
        params.put("scope", "openid profile email");
        params.put("$auth0Client", auth0Client);

        Response response = RestAssured
                .given()
                .headers(headers)   // Set the headers
                .params(params)
                .redirects()
                .follow(false)
                .when()
                .get(url)
                .then()
                .extract()
                .response();

        System.out.println(response.getBody().asString() + "\n");

        String[] urls = response.getBody().asString().split("Found. Redirecting to ");
        String accessToken = null;

        try {
            // Parse the URL
            URI uri = new URI(urls[1]);

            // Extract the access_token parameter from the fragment
            String fragment = uri.getFragment();
            String[] params1 = fragment.split("&");


            for (String param : params1) {
                if (param.startsWith("access_token=")) {
                    accessToken = param.substring("access_token=".length());
                    break;
                }
            }

            if (accessToken != null) {
                System.out.println("Access Token: " + accessToken);
            } else {
                System.out.println("Access Token not found in the URL.");
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        bearerToken = accessToken; // Replace with the actual bearer token

        // Split the JWT token into its parts (header, payload, signature)
        String[] parts = bearerToken.split("\\.");

        // Decode the payload (the second part)
        String encodedPayload = parts[1];
        byte[] decodedBytes = Base64.getUrlDecoder().decode(encodedPayload);

        // Convert the bytes to a UTF-8 string
        String payloadJson = new String(decodedBytes, StandardCharsets.UTF_8);

        // Get the payload as a JSON object
        JSONObject payload = new JSONObject(payloadJson);

        System.out.println(payload);

        // Get the values from the JSON object
        userKey = payload.getString(hostAudience + "/local_user_id");
        entityKey = payload.getString(hostAudience + "/entity_id");
        groupKey = payload.getJSONArray(hostAudience + "/groups").getString(0);

        JSONArray subgroupsArray = payload.getJSONArray(hostAudience + "/subgroups");
        subgroups = subgroupsArray.length() > 0 ? subgroupsArray.getString(0) : "";

        // Print the values
        System.out.println("Bearer Token: " + bearerToken);
        System.out.println("User Key: " + userKey);
        System.out.println("Entity Key: " + entityKey);
        System.out.println("Group Key: " + groupKey);
        System.out.println("Subgroups: " + subgroups);

        System.out.println();
    }

    public void mfa_verify() {

        String hostAuthMfa = authConfigs.get("host_auth_mfa");
        String hostLogin = authConfigs.get("host_login");

        // Generate MFA token
        String generateMfaTokenUri = hostAuthMfa + "/users/" + userKey + "/mfa?product_id=" + productId;

        Map<String, String> generateMfaTokenHeaders = new HashMap<>();
        generateMfaTokenHeaders.put("accept", "application/json");
        generateMfaTokenHeaders.put("Authorization", bearerToken);

        Response generateMfaTokenResponse = RestAssured.given()
                .headers(generateMfaTokenHeaders)
                .request(Method.PATCH, generateMfaTokenUri);

        System.out.println(generateMfaTokenResponse.getStatusCode());
        System.out.println(generateMfaTokenResponse.getBody().asString());

        if (generateMfaTokenResponse.getStatusCode() != 200) {
            throw new RuntimeException(generateMfaTokenResponse.getBody().asString());
        }

        // Perform MFA verification
        String mfaVerifyUri = hostAuthMfa + "/users/" + userKey + "/mfa_verify";
        Map<String, String> mfaVerifyHeaders = new HashMap<>();
        mfaVerifyHeaders.put("accept", "application/json");
        mfaVerifyHeaders.put("content-type", "application/json");
        mfaVerifyHeaders.put("authorization", bearerToken);
        mfaVerifyHeaders.put("origin", hostLogin);
        mfaVerifyHeaders.put("referer", hostLogin);

        Map<String, Object> mfaVerifyPayload = new HashMap<>();
        mfaVerifyPayload.put("otp", "999999");
        mfaVerifyPayload.put("product_id", productId);

        Response mfaVerifyResponse = RestAssured.given()
                .contentType(ContentType.JSON)
                .headers(mfaVerifyHeaders)
                .body(mfaVerifyPayload)
                .request(Method.PATCH, mfaVerifyUri);

        if (mfaVerifyResponse.getStatusCode() != 200) {
            throw new RuntimeException(mfaVerifyResponse.getBody().asString());
        }

        System.out.println(mfaVerifyResponse.getStatusCode());
        System.out.println(mfaVerifyResponse.getBody().asString());

        mfaToken = mfaVerifyResponse.getBody().jsonPath().get("mfa_token");

        System.out.println("MFA Token: " + mfaToken);
    }
}
