package coe.smartapi.model.request.parsed;

import java.util.List;
import lombok.Data;

@Data
public class Testdata {
    private List<DataField> testData;

    @Data
    public static class DataField {
        private String id;
        private String name;
        private boolean selected;
        private List<DataType> dataType;
        private List<CustomField> custom;
        private List<ConfigField> config;
    }

    @Data
    public static class DataType {
        private String value;
        private String label;
    }

    @Data
    public static class CustomField {
        private String fieldId;
        private String fieldName;
    }

    @Data
    public static class ConfigField {
        private String fieldId;
        private String fieldName;
    }
}

