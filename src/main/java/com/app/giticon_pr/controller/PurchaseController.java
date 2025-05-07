package com.app.giticon_pr.controller;

import com.app.giticon_pr.mapper.PurchaseMapper;
import com.app.giticon_pr.model.Gifticon;
import com.app.giticon_pr.model.PurchaseHistory;
import com.app.giticon_pr.model.PurchaseItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase")
public class PurchaseController {

    private final PurchaseMapper purchaseMapper;

    public PurchaseController(PurchaseMapper purchaseMapper) {
        this.purchaseMapper = purchaseMapper;
    }

    // 결제 내역 등록 + 관련 아이템도 같이 등록할 수 있도록 처리
    @PostMapping
    public void insertPurchase(@RequestBody PurchaseHistory history) {
        purchaseMapper.insertPurchaseHistory(history);

        // PurchaseItem 목록이 history 내부에 있다고 가정
        if (history.getItems() != null) {
            for (PurchaseItem item : history.getItems()) {
                item.setPurchaseId(history.getId()); // 방금 insert한 history ID
                purchaseMapper.insertPurchaseItem(item);
            }
        }
    }

    // 사용자별 구매한 기프티콘 목록 조회
    @GetMapping("/{userId}")
    public List<Gifticon> getPurchaseHistory(@PathVariable Long userId) {
        return purchaseMapper.findPurchasedGifticons(userId);
    }
}
