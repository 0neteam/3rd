package com.java.cafe.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@Builder
@Schema(description = "요청 및 응답 DTO")
public class ResTestDTO {

    @Schema(description = "어떤 메세지 보낼라구", defaultValue = "null")
    private String msg;
    @Schema(description = "어떤 숫자 보낼라구")
    private int no;
    @Schema(description = "데이터 이거저거 담아볼라구")
    private Object data;
}
