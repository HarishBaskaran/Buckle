package coe.smartapi.model.request;

import coe.smartapi.model.Output;
import coe.smartapi.model.QueryParamsOutput;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {

    private List<Object> singleBody;
    private List<Output> singleBodyTestOutput;
    private List<Object> multiBody;
    private List<Output> multiBodyTestOutput;
    private List<Object> singleQuery;
    private List<QueryParamsOutput> singleQueryTestOutput;
    private List<Object> multiQuery;
    private List<QueryParamsOutput> multiQueryTestOutput;
}
