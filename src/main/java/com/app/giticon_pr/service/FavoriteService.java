package com.app.giticon_pr.service;

import com.app.giticon_pr.model.Gifticon;
import com.app.giticon_pr.model.Favorite;

import java.util.List;

public interface FavoriteService {
    void addFavorite(Long userId, Long gifticonId);
    void removeFavorite(Long userId, Long gifticonId);
    List<Gifticon> getFavoritesByUserId(Long userId);
}
