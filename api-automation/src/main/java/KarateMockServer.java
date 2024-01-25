import com.intuit.karate.core.MockServer;

import java.util.ArrayList;
import java.util.List;

public class KarateMockServer {
    static MockServer server1;

    public static void main(String[] args) {
        startServer();
    }

    public static void startServer() {

        List<String> featurePaths = new ArrayList<>();
        featurePaths.add("classpath:mocks/features/testAuthMock.feature");
        featurePaths.add("classpath:mocks/features/testUserMock.feature");

        server1 = MockServer
                .featurePaths(featurePaths)
                .http(9195)
                .build();

    }


}
