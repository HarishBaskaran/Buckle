package coe.smartapi.model.request.parsed;

import lombok.Data;

@Data
public class Environment {
    private String fieldName;
    private String fieldType;
    private String oldFieldValue;
    private String newFieldValue;
    private boolean optionalField;
    private boolean uniqueField;
    private int status;
    private Object response;
}
