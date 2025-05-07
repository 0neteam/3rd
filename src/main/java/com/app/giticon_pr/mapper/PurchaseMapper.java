package com.app.giticon_pr.mapper;

import com.app.giticon_pr.model.Gifticon;
import com.app.giticon_pr.model.PurchaseHistory;
import com.app.giticon_pr.model.PurchaseItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PurchaseMapper {
    void insertPurchaseHistory(PurchaseHistory history);
    void insertPurchaseItem(PurchaseItem item);
    List<Gifticon> findPurchasedGifticons(@Param("userId") Long userId);
}
