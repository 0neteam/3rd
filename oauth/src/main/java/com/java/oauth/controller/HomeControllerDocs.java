package com.java.oauth.controller;

import com.java.oauth.dto.ResDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;

@Tag(name="홈 컨트롤러", description = "프로젝트 테스트 확인")
public interface HomeControllerDocs {


    /***************************************************
     * operationId: Endpoint 아이디
     * summary: 간단한 설명으로 Swagger-ui의 Endpoint 상단에 노출
     * description: 엔드포인트 상세 설명
     * tags: 현재 Endpoint가 어떠한 tag 그룹에 속한지 알려주는 속성
     * response: 응답코드, 응답 타입
     * security: 보안방법에 대한 설정
     * *************************************************/
    @Operation(summary = "Get 방식 호출", description = "DTO 응답 테스트")

    /***************************************************
     * name : 파라미터 이름
     * description : 파라미터 설명
     * required : 필수/선택 여부
     * in : 파라미터의 타입 설정
     * ParameterIn.QUERY : 요청 쿼리 파라미터
     * ParameterIn.HEADER : 요청 헤더에 전달되는 파라미터
     * ParameterIn.PATH: PathVariable 에 속하는 파라미터
     * 값없음: RequestBody에 해당하는 객체 타입의 파라미터
     * *************************************************/
    @Parameter(name = "txt", description = "테스트용 글자 입력")

    /***************************************************
     * responseCode: HTTP 상태코드
     * description : 응답 결과 구조에 대한 설명
     * content : 응답 페이로드 구조
     * schema : 페이로드에서 사용하는 객체 스키마
     * *************************************************/
    @ApiResponse(responseCode = "200",
            description = "테스트 성공 응답",
            content = @Content(schema = @Schema(implementation = ResDTO.class)))
    public ResDTO home(String txt);

}