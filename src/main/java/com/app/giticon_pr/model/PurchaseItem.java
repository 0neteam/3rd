package com.app.giticon_pr.model;

import lombok.Data;

@Data
public class PurchaseItem {
    private Long purchaseId;   // 외래키 (purchase_history.id)
    private Long gifticonId;   // 구매한 기프티콘 ID
}
