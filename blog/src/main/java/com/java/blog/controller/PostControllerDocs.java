package com.java.blog.controller;

import com.java.blog.dto.PostDTO;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PathVariable;

@Tag(name="PostController", description = "게시글 작성,조회, 수정, 삭제")
public interface PostControllerDocs {


    public PostDTO read(@PathVariable("domain") String domain, @PathVariable("no") Integer no);
}
