package coe.smartapi.controllers;

import coe.smartapi.utils.CurlToJSONConverter;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
public class CurlController {

    @PostMapping("/curl")
    public Map<String, Object> convertCurl(@RequestBody String curlData) {
        return CurlToJSONConverter.parser(curlData);
    }
}