package com.java.blog.service;

import com.java.blog.dto.PostDTO;


public interface BlogService {
    PostDTO read(String domain, Integer no);
}
