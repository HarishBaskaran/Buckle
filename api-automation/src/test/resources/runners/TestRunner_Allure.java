package runners;

import utils.AllureReportServer;
import com.intuit.karate.junit5.Karate;
import io.qameta.allure.karate.AllureKarate;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;


public class TestRunner_Allure {

    @BeforeAll
    public static void allureClean() {
        AllureReportServer.deleteFilesInFolder();
    }

    @Karate.Test
    public Karate testApi() {
        return Karate
                .run("classpath:features/authService.feature",
                        "classpath:features/authService2.feature")
                .hook(new AllureKarate())
                .relativeTo(getClass())
                .outputJunitXml(true);
    }


    @AfterAll
    public static void allureServe() {
        AllureReportServer.startAllureReportServer();
    }

}