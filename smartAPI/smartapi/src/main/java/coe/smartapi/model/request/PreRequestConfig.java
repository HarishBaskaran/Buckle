package coe.smartapi.model.request;

import lombok.Data;

@Data
public class PreRequestConfig {
    private String sourceRequest;
    private String sourceType;
    private String sourceKey;
    private String destType;
    private String destKey;
}