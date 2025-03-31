package com.java.cafe.repository;

import com.java.cafe.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer> {

    public List<Menu> findByBoardNoAndRefAndUseYNOrderByOrderNoAsc(Integer boardNo, Integer ref, char useYN);
    public List<Menu> findByRefAndUseYN(Integer ref, char useYN);
    public Integer countByBoardNoAndRef(Integer boardNo, Integer ref);

}
