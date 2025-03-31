package com.java.blog.controller;

import com.java.blog.dto.PostDTO;
import com.java.blog.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/{domain}/post")
@RestController
@RequiredArgsConstructor
public class PostController implements PostControllerDocs{

    private final BlogService blogService;

    @GetMapping("/{no:[0-9]+}")
    public PostDTO read(@PathVariable("domain") String domain, @PathVariable("no") Integer no) {

        return blogService.read(domain, no);
    }

}
