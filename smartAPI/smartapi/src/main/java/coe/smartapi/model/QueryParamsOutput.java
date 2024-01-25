package coe.smartapi.model;

import lombok.Data;
import java.util.List;

@Data
public class QueryParamsOutput {
    private String entity;
    private List<ChangeSummary> changeSummary;
    private int statusCode;
    private String response;

    @Override
    public String toString() {
        return "\n{" +
                "\nentity:'" + entity + '\'' +
                ", \nchangeSummary:" + changeSummary +
                ", \nstatusCode:" + statusCode +
                ", \nresponse:" + response +
                "\n}";
    }
}
