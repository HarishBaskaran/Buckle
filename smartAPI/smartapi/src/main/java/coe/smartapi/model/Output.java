package coe.smartapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;
import java.util.Map;

@NoArgsConstructor(force = true)
@Data
public class Output {
    private Map<String, Object> entity;
    private List<ChangeSummary> changeSummary;
    @NonNull
    private int statusCode;
    private String response;

    @Override
    public String toString() {
        return "\n{" +
                "\nentity:" + entity +
                ", \nchangeSummary:" + changeSummary +
                ", \nstatusCode:" + statusCode +
                ", \nresponse:" + response +
                "\n}";
    }
}

