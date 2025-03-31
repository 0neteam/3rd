package com.java.oauth.controller;

import com.java.oauth.dto.ResDTO;
import org.springframework.stereotype.Controller;

@Controller
public class HomeController implements HomeControllerDocs {

    public ResDTO home(String txt) {
        return ResDTO.builder()
                .status(true)
                .data(new String[] {"일","이","삼"})
                .msg(txt)
                .build();
    }
}
