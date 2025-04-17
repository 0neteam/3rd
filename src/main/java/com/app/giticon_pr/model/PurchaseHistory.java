package com.app.giticon_pr.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PurchaseHistory {
    private Long id;
    private Long userId;
    private Integer totalPrice;
    private LocalDateTime purchasedAt;

    // 🔥 프론트에서 같이 보내는 purchase items
    private List<PurchaseItem> items;
}
