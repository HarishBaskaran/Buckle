package coe.smartapi.utils;

import io.qameta.allure.AllureLifecycle;
import io.qameta.allure.model.*;

import java.util.ArrayList;
import java.util.List;

public class AllureReporting {

    AllureLifecycle lifecycle;

    public AllureReporting(AllureLifecycle lifecycle) {
        this.lifecycle = lifecycle;
    }

    public void startContainer(String uuid, String name) {
        TestResultContainer container = new TestResultContainer()
                .setUuid(uuid)
                .setName(name);
        lifecycle.startTestContainer(container);
    }

    public void startChildContainer(String parentUUID, String uuid, String name) {
        TestResultContainer childContainer = new TestResultContainer()
                .setUuid(uuid)
                .setName(name);
        lifecycle.startTestContainer(parentUUID, childContainer);
    }

    public void stopContainer(String uuid) {
        lifecycle.stopTestContainer(uuid);
        lifecycle.writeTestContainer(uuid);
    }

    public TestResult startTestCase(String uuid, String name) {
        TestResult result = new TestResult()
                .setUuid(uuid)
                .setName(name)
                .setStatus(io.qameta.allure.model.Status.PASSED);

        lifecycle.scheduleTestCase(result);
        lifecycle.startTestCase(uuid);

        return result;
    }

    public TestResult updateStatus(TestResult result, Status status, String statusMessage) {
        result.setStatusDetails(new StatusDetails().setMessage(statusMessage))
                .setStatus(status);

        return result;
    }

    public TestResult setLabels(TestResult result, String parentName, String childName) {
        Label containerLabel = new Label();
        containerLabel.setName("suite").setValue(parentName);

        Label childContainerLabel = new Label();
        childContainerLabel.setName("subSuite").setValue(childName);

        List<Label> labels = new ArrayList<>();
        labels.add(containerLabel);
        labels.add(childContainerLabel);

        result.setLabels(labels);

        return result;
    }

    public void stopTestCase(String uuid) {
        lifecycle.stopTestCase(uuid);
        lifecycle.writeTestCase(uuid);
    }

    public void step(String uuid, String name, String message) {
        StepResult stepResult = new StepResult()
                .setName(name)
                .setStatus(Status.PASSED);

        lifecycle.startStep(uuid, stepResult);
        AllureReportServer.logStepMessage(message);
        lifecycle.stopStep();
    }

    public void step(String uuid, String name, String statusMessage, Status status, String message) {
        StepResult stepResult = new StepResult()
                .setName(name)
                .setStatusDetails(new StatusDetails().setMessage(statusMessage))
                .setStatus(status);

        lifecycle.startStep(uuid, stepResult);
        if (null != message && message.length() > 0)
            AllureReportServer.logStepMessage(message);
        lifecycle.stopStep();
    }

}
