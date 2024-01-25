package coe.smartapi.waste;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
//import com.aventstack.extentreports.reporter.ExtentHtmlReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;
import org.testng.IReporter;
import org.testng.ISuite;
import org.testng.ISuiteResult;
import org.testng.ITestContext;
import org.testng.xml.XmlSuite;
import java.util.List;
import java.util.Map;

public class ExtentReportListener implements IReporter {
    private ExtentReports extent;

    public void generateReport(List<XmlSuite> xmlSuites, List<ISuite> suites, String outputDirectory) {
        String reportLocation = outputDirectory + "/ExtentReport.html";

//        ExtentHtmlReporter htmlReporter = new ExtentHtmlReporter(reportLocation);
//        htmlReporter.config().setDocumentTitle("Extent Report Demo");
//        htmlReporter.config().setReportName("Extent Report");
//        htmlReporter.config().setTheme(Theme.DARK);

        extent = new ExtentReports();
//        extent.attachReporter(htmlReporter);

        for (ISuite suite : suites) {
            Map<String, ISuiteResult> suiteResults = suite.getResults();

            for (ISuiteResult suiteResult : suiteResults.values()) {
                ITestContext testContext = suiteResult.getTestContext();
                ExtentTest extentTest = extent.createTest(testContext.getName());

                // Add your test logs, status, etc., using extentTest.log() methods

                extent.flush();
            }
        }
    }
}

