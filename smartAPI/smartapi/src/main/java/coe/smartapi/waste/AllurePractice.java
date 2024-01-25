package coe.smartapi.waste;


import coe.smartapi.utils.AllureReportServer;
import io.qameta.allure.*;
import io.qameta.allure.model.Label;
import io.qameta.allure.model.Status;
import io.qameta.allure.model.TestResult;
import io.qameta.allure.model.TestResultContainer;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;

public class AllurePractice {

    private static AllureLifecycle lifecycle = Allure.getLifecycle();

    public static void main(String[] args) {
        final String uuid_container = "Container1";
        final String name_container = "Container Name";
        final TestResultContainer container = new TestResultContainer()
                .setUuid(uuid_container)
                .setName(name_container);
        lifecycle.startTestContainer(container);

        final String childUuid = "ChildContainer1";
        final String childName = "Child Container Name";
        final TestResultContainer childContainer = new TestResultContainer()
                .setUuid(childUuid)
                .setName(childName);
        lifecycle.startTestContainer(uuid_container, childContainer);


        final String uuid_test = "TestCase1";
        final String name_test = "Test Case Name 1";
        final TestResult result = new TestResult()
                .setUuid(uuid_test)
                .setName(name_test)
                .setStatus(Status.PASSED);

        lifecycle.scheduleTestCase(result);
        lifecycle.startTestCase(uuid_test);

        Label containerLabel = new Label();
        containerLabel.setName("suite").setValue(name_container);

        Label childContainerLabel = new Label();
        childContainerLabel.setName("subSuite").setValue(childName);

        List<Label> labels = new ArrayList<>();
        labels.add(containerLabel);
        labels.add(childContainerLabel);

        result.setLabels(labels);

        lifecycle.stopTestCase(uuid_test);
        lifecycle.writeTestCase(uuid_test);

        lifecycle.stopTestContainer(childUuid);
        lifecycle.writeTestContainer(childUuid);

        List<String> containers = container.getChildren();
        containers.add(childUuid);
        container.setChildren(containers);

        lifecycle.stopTestContainer(uuid_container);
        lifecycle.writeTestContainer(uuid_container);

        AllureReportServer.main(null);
    }

    @Test
    public void myTest() {
        step1();
        step2();
        step3();
    }

    private void step1() {
        Allure.step("Step 1", () -> {
            // Your test logic for step 1 goes here
            addScreenshot();
            attachLog("Step 1 completed.");
        });
    }

    private void step2() {
        Allure.step("Step 2", () -> {
            // Your test logic for step 2 goes here
            addScreenshot();
            attachLog("Step 2 completed.");
        });
    }

    private void step3() {
        Allure.step("Step 3", () -> {
            // Your test logic for step 3 goes here
            addScreenshot();
            attachLog("Step 3 completed.");
        });
    }

    private void addScreenshot() {
        // Your screenshot capture logic goes here
        // For simplicity, not implementing it in this example
    }

    private void attachLog(String logMessage) {
        Allure.addAttachment("Log", "text/plain", logMessage);
    }
}


