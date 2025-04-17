package com.app.giticon_pr.mapper;

import com.app.giticon_pr.model.Gifticon;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GifticonMapper {
    List<Gifticon> findAll();
    List<Gifticon> findByBrand(@Param("brand") String brand);
    List<Gifticon> searchByKeyword(@Param("keyword") String keyword);
    Gifticon findById(@Param("id") Long id);
    void insert(Gifticon gifticon);
    void update(Gifticon gifticon);
    void deleteById(@Param("id") Long id);
    
}
