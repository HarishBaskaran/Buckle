package runners;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.testng.AssertJUnit.assertTrue;

public class TestRunner_Cucumber {

    @Test
    public void testApi() {

        List<String> paths = new ArrayList<>();
        paths.add("classpath:com/b2c/api/automation/features/new/testAuthService.feature");

        Results results = Runner.path(paths)
                .outputCucumberJson(true)
                .parallel(3);

        generateReport(results.getReportDir());
        assertTrue (results.getErrorMessages(), results.getFailCount() == 0);
    }

    public static void generateReport_old_1(String karateOutputPath) {
        Collection<File> jsonFiles = FileUtils.listFiles(new File(karateOutputPath), new String[]{"json"}, true);
        final List<String> jsonPaths = new ArrayList(jsonFiles.size());
        jsonFiles.forEach(file -> jsonPaths.add(file.getAbsolutePath()));
        Configuration config = new Configuration(new File("target"), "Report-Name");
        ReportBuilder reportBuilder = new ReportBuilder(jsonPaths, config);
        reportBuilder.generateReports();
    }

    public static void generateReport(String karateOutputPath) {

        Collection<File> jsonFiles = FileUtils.listFiles(new File(karateOutputPath), new String[]{"json"}, true);
        final List<String> jsonPaths = new ArrayList(jsonFiles.size());
        // Log the JSON file paths
        jsonFiles.forEach(file -> {
            String jsonPath = file.getAbsolutePath();
            jsonPaths.add(jsonPath);
        });

        if (jsonPaths.isEmpty()) {
            System.out.println("-#-No JSON report files found.");
        } else {
            Configuration config = new Configuration(new File("target"), "Report-Name");
            ReportBuilder reportBuilder = new ReportBuilder(jsonPaths, config);
            reportBuilder.generateReports();

            System.out.println(config.getReportDirectory().getAbsolutePath() +
                     "/" + ReportBuilder.BASE_DIRECTORY + "/" + ReportBuilder.HOME_PAGE);
        }
    }
}