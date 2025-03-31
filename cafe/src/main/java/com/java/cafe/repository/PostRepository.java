package com.java.cafe.repository;

import com.java.cafe.entity.Menu;
import com.java.cafe.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    public List<Post> findByMenuNoAndUseYN(Integer no, char useYN);
    public List<Post> findAllByMenuNoAndUseYNOrderByRegDate(Integer menuNo, char useYN);

}
