package com.app.giticon_pr.model;

import lombok.Data;

import java.util.Date;

@Data
public class Gifticon {
    private Long id;
    private String name;
    private String brand;
    private Integer faceValue;
    private Integer price;
    private String imageUrl;
    private Date expireDate;
}
