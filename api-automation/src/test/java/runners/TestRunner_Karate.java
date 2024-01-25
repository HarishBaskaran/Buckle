package runners;

import com.intuit.karate.core.Feature;
import com.intuit.karate.junit5.Karate;
import io.netty.util.internal.SystemPropertyUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TestRunner_Karate {

    @Karate.Test
    public Karate testsForKarate() {

//        List<Feature> featurePaths = new ArrayList<>();
//        featurePaths.add(Feature.read("classpath:com/b2c/api/automation/features/mock/testAuthService.feature"));
//        featurePaths.add(Feature.read("classpath:com/b2c/api/automation/features/new/testAuthService.feature"));


        System.out.println("Karate Env: " + System.getProperty("karate.env"));

        List<String> tagsList = new ArrayList<>();
        if(null != System.getProperty("karate.tags")) {
            if (System.getProperty("karate.tags").contains(","))
                tagsList = Arrays.asList(System.getProperty("karate.tags").split(","));
            else
                tagsList.add(System.getProperty("karate.tags"));
        }
        System.out.println("Karate Tags: " + tagsList);

        return Karate.run(
                "classpath:com/b2c/api/automation/features/mock/testAuthService.feature"
                     ,"classpath:com/b2c/api/automation/features/new/testAuthService.feature"
                )
                .tags(tagsList)
                .relativeTo(getClass())
                .reportDir("target/surefire-reports")

                .outputHtmlReport(true)
                .outputJunitXml(true)
               ;
    }

}





