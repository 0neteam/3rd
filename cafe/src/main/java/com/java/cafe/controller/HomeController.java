package com.java.cafe.controller;

import com.java.cafe.dto.ResTestDTO;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HomeController implements HomeControllerDocs{

    @GetMapping("/")
    public ResTestDTO test(@RequestParam String txt, @RequestParam String txt2){
        ResTestDTO res1 = ResTestDTO.builder().msg("1차로 이거 넣어보고연").no(1).data(txt).build();
        ResTestDTO res2 = ResTestDTO.builder().msg("2차로 이거 넣어보고연").no(2).data(txt2).build();
        List<ResTestDTO> res3data = new ArrayList<>();
        res3data.add(res1);
        res3data.add(res2);
        ResTestDTO res3 = ResTestDTO.builder().msg("해치웠구연~").no(3).data(res3data).build();

        return res3;
    }
}
