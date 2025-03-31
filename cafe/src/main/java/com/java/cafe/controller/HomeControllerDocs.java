package com.java.cafe.controller;

import com.java.cafe.dto.ResTestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "HOME", description = "HomeController method")
public interface HomeControllerDocs {

    @Operation(summary = "test 메서드", description = "데이터 잘 전달되는지 확인할라구 만들어본 메서드임")
    @Parameters(value = {
            @Parameter(name="txt", description = "res1에 들어가는 값이구연"),
            @Parameter(name="txt2", description = "이건 2에 드가겠지연?"),
    })
    @ApiResponse(responseCode = "200",
            description = "테스트 성공 응답",
            content = @Content(schema = @Schema(implementation = ResTestDTO.class)))
    public ResTestDTO test(String txt, String txt2);
}
