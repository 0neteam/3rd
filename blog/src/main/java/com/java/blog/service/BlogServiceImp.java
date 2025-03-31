package com.java.blog.service;

import com.java.blog.dto.PostDTO;
import com.java.blog.entity.PostEntity;
import com.java.blog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BlogServiceImp implements BlogService{

    private final PostRepository postRepository;

    @Override
    public PostDTO read(String domain, Integer no) {
        PostEntity post = postRepository.findById(no).orElseThrow();
        PostDTO postDTO = PostDTO.builder().build();
        if(post != null) {
            postDTO = PostDTO.builder()
                    .no(post.getNo())
                    .menuNo(post.getMenu().getNo())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .regName(post.getUser().getName())
                    .menuName(post.getMenu().getName())
                    .regDate(post.getRegDate())
                    .viewCount(post.getViewCount())
                    .build();
            return postDTO;
        }
        return PostDTO.builder().build();
    }
}
