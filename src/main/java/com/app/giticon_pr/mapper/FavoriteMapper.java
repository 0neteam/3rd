package com.app.giticon_pr.mapper;

import com.app.giticon_pr.model.Favorite;
import com.app.giticon_pr.model.Gifticon;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FavoriteMapper {
    List<Gifticon> findAllByUserId(@Param("userId") Long userId);
    void insert(Favorite favorite);
    void deleteById(@Param("id") Long id);
    void deleteByUserAndGifticon(@Param("userId") Long userId, @Param("gifticonId") Long gifticonId);
}