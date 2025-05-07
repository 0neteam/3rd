package com.app.giticon_pr.service;

import com.app.giticon_pr.mapper.FavoriteMapper;
import com.app.giticon_pr.model.Favorite;
import com.app.giticon_pr.model.Gifticon;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Override
    public void addFavorite(Long userId, Long gifticonId) {
        Favorite favorite = new Favorite();
        favorite.setUserId(userId);
        favorite.setGifticonId(gifticonId);
        favoriteMapper.insert(favorite); // 이미 중복 방지 로직 있음
    }

    @Override
    public void removeFavorite(Long userId, Long gifticonId) {
        favoriteMapper.deleteByUserAndGifticon(userId, gifticonId);
    }

    @Override
    public List<Gifticon> getFavoritesByUserId(Long userId) {
        return favoriteMapper.findAllByUserId(userId);
    }
}
