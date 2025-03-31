package com.java.oauth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Schema(description = "테스트용 응답 DTO")
//@Setter
@Getter
@ToString
@Builder
//@NoArgsConstructor
//@AllArgsConstructor
public class ResDTO {

    @Schema(description = "상태값 정의", defaultValue = "false")
    private boolean status;
    @Schema(description = "결과값 정의")
    private String[] data;
    @Schema(description = "결과 메시지")
    private String msg;
}
