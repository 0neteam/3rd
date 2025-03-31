package com.java.cafe.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@Builder
public class ResTestDTO {

    private String msg;
    private int no;
    private Object data;
}
