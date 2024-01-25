package coe.smartapi.model.request;

import lombok.Data;

@Data
public class HttpMethod {

    private String value;
    private String label;
    private boolean selected;
}
