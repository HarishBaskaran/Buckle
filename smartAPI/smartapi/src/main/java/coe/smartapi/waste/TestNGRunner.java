package coe.smartapi.waste;

import coe.smartapi.runners.RunnerWithExtentWithoutParallel;
import org.testng.TestListenerAdapter;
import org.testng.TestNG;
import org.testng.xml.XmlClass;
import org.testng.xml.XmlSuite;
import org.testng.xml.XmlTest;

import java.util.Collections;

public class TestNGRunner {

    public static void singleClassRunner() {
        TestNG testng = new TestNG();
        testng.setTestClasses(new Class[] { RunnerWithExtentWithoutParallel.class });
        testng.run();
    }

    public static void main(String[] args) {
        TestNG testng = new TestNG();
        testng.addListener(new TestListenerAdapter());

        XmlSuite suite = new XmlSuite();
        suite.setName("SingleTestMethodSuite");

        XmlTest test = new XmlTest(suite);
        test.setName("testGetRequest");

        XmlClass testClass = new XmlClass(RunnerWithExtentWithoutParallel.class);
        test.setXmlClasses(Collections.singletonList(testClass));

        testng.setXmlSuites(Collections.singletonList(suite));
        testng.run();
    }
}
