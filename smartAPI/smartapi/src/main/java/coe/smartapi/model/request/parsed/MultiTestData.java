package coe.smartapi.model.request.parsed;

import lombok.Data;

import java.util.List;

@Data
public class MultiTestData {
    private List<DataField> multiTestData;

    @Data
    public static class DataField {
        private String id;
        private String name;
        private boolean selected;
        private List<List<Option>> options;
        private List<List<ConfigField>> config;
    }

    @Data
    public static class Option {
        private String value;
        private String label;
        private boolean selected;
        private boolean unique;
        private Selectors selectors;
    }

    @Data
    public static class ConfigField {
        private String value;
        private String label;
        private boolean selected;
        private boolean unique;
        private Selectors selectors;
    }

    @Data
    public static class Selectors {
        private String type;
        private String format;
        private String formatFlag;
        private String range;
        private String timestamp;
        private String prefix;
    }
}

