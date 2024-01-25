package coe.smartapi.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class TestDummyController {

    @GetMapping("/users/{user}/names/{name}")
    public void getTest(@PathVariable String user,
                        @PathVariable String name,
                        @RequestParam(defaultValue = "1") int page) {
        System.out.println("hitted by 8082");
    }
}
