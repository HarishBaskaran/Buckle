package coe.smartapi.model;

import coe.smartapi.model.request.PreRequestConfig;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class RequestModel {
    private String method;
    private String url;
    private Map<String, Object> headers;
    private Map<String, Object> positive;
    private List<QueryParamsOutput> queryParamsOutput;
    private List<Output> output;
    private List<PreRequestConfig> preRequest;

    @Override
    public String toString() {
        return "{\nRequestModel :{" +
                "\nmethod:'" + method + '\'' +
                ", \nurl:'" + url + '\'' +
                ", \nheaders:" + headers +
                ", \npositive:" + positive +
                ", \nqueryParamsOutput:" + queryParamsOutput +
                ", \noutput:" + output +
                ", \npreRequest:" + preRequest +
                "\n}\n}";
    }
}
