package coe.smartapi.model;

import lombok.Data;

@Data
public class ChangeSummary {
    private String fieldName;
    private String oldFieldType;
    private Object oldFieldValue;
    private String newFieldType;
    private Object newFieldValue;
    private int status;
    private Object response;

    @Override
    public String toString() {
        return "\n{" +
                "fieldName:'" + fieldName + '\'' +
                ", oldFieldType:'" + oldFieldType + '\'' +
                ", oldFieldValue:" + oldFieldValue +
                ", newFieldType:'" + newFieldType + '\'' +
                ", newFieldValue:" + newFieldValue +
                ", status:" + status +
                ", response:" + response +
                "}";
    }
}
