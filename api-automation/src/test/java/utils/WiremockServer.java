package utils;

import com.github.tomakehurst.wiremock.WireMockServer;

import static com.github.tomakehurst.wiremock.client.WireMock.*;

public class WiremockServer {

    private static int portNo = 8097;
    private static WireMockServer wireMockServer
            = new WireMockServer(portNo);

    public static void startServer(){
        wireMockServer.start();
        stubs();
    }

    public static void stopServer(){
        wireMockServer.stop();
    }

    private static void stubs(){
        configureFor("localhost", portNo);
        stubFor(get(urlEqualTo("/users")).willReturn(aResponse().withBody("Welcome to users details!")));
        stubFor(get(urlEqualTo("/user/get")).willReturn(aResponse().withStatus(200).withHeader("Content-Type", "application/json")
                                .withBody("{ \"id\": \"1234\", name: \"John Smith\" }")));
    }

    /*
            API test case -> BE service -> Mock service ( Wiremock / Spring boot )
                            BE - Mock -- Validate the req schema & fetches the response - send to BE
            API test case -> Mock service -> BE Service
     */
}
