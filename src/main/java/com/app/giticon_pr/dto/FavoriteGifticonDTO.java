package com.app.giticon_pr.dto;

import lombok.Data;

@Data
public class FavoriteGifticonDTO {
    private Long favoriteId;
    private Long gifticonId;
    private String name;
    private String brand;
    private Integer price;
}