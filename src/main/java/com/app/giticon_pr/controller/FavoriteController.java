package com.app.giticon_pr.controller;

import com.app.giticon_pr.mapper.FavoriteMapper;
import com.app.giticon_pr.model.Favorite;
import com.app.giticon_pr.model.Gifticon;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteMapper favoriteMapper;

    public FavoriteController(FavoriteMapper favoriteMapper) {
        this.favoriteMapper = favoriteMapper;
    }

    @GetMapping("/{userId}")
    public List<Gifticon> getFavorites(@PathVariable("userId") Long userId) {
        return favoriteMapper.findAllByUserId(userId);
    }

 @PostMapping
public ResponseEntity<?> addFavorite(@RequestBody Favorite favorite) {
    if (favorite.getUserId() == null || favorite.getGifticonId() == null) {
        return ResponseEntity.badRequest().body("❌ userId 또는 gifticonId가 없습니다.");
    }

    try {
        favoriteMapper.insert(favorite);
        return ResponseEntity.ok("✅ 찜 등록 성공");
    } catch (DuplicateKeyException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("⚠️ 이미 찜한 기프티콘입니다.");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("❌ 찜 등록 실패: " + e.getMessage());
    }
}

    @DeleteMapping("/{id}")
    public void deleteFavorite(@PathVariable("id") Long id) {
        favoriteMapper.deleteById(id);
    }

    @DeleteMapping
    public void deleteByUserAndGifticon(@RequestBody Map<String, Long> map) {
        favoriteMapper.deleteByUserAndGifticon(map.get("userId"), map.get("gifticonId"));
    }
}
