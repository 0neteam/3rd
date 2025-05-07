package com.app.giticon_pr.dto;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long cartId;
    private Long gifticonId;
    private String name;
    private Integer price;
    private String imageUrl;
    private Integer quantity; // 장바구니 수량을 추가하고 싶을 때
}