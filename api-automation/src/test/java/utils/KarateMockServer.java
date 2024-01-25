package utils;

import com.intuit.karate.core.MockServer;

import java.util.ArrayList;
import java.util.List;

public class KarateMockServer {
    static MockServer server1;
    static MockServer server2;

    public static void main(String[] args) {

        List<String> featurePaths = new ArrayList<>();
//        featurePaths.add("classpath:com/b2c/api/automation/mocks/testMock.feature");
        featurePaths.add("classpath:com/b2c/api/automation/mocks/testAuthMock.feature");

//        server1 = MockServer
//                .feature("classpath:com/b2c/api/automation/mocks/testMock.feature")
//                .http(9194)
//                .build();

        server2 = MockServer
                .featurePaths(featurePaths)
                .http(9195)
                .build();

    }


}
