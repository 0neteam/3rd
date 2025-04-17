package com.app.giticon_pr.mapper;

import com.app.giticon_pr.model.Cart;
import com.app.giticon_pr.model.Gifticon;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CartMapper {
    List<Gifticon> findAllByUserId(@Param("userId") Long userId);
    void insert(Cart cart);
    void deleteById(@Param("id") Long id);
    void deleteAllByUserId(@Param("userId") Long userId);
}