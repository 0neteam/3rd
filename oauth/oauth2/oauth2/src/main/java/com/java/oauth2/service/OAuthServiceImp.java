package com.java.oauth2.service;

import com.java.oauth2.common.UserUtils;
import com.java.oauth2.common.Utils;
import com.java.oauth2.dto.CustomOAuth2User;
import com.java.oauth2.dto.FileDTO;
import com.java.oauth2.dto.FileResDTO;
import com.java.oauth2.dto.OauthReqDTO;
import com.java.oauth2.entity.CardInfo;
import com.java.oauth2.entity.OAuthClient;
import com.java.oauth2.repository.OAuthClientRepository;
import com.java.oauth2.repository.CardInfoRepository;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Sort;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthServiceImp implements OAuthService {

  private final OAuthClientRepository oAuthClientRepository;
  private final CardInfoRepository cardInfoRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  private final JwtDecoder jwtDecoder;
  private final JWKSet jwkSet;

  private final FileService fileService;
  private final Utils utils;


  // application.properties에서 호스팅 도메인 정보를 가져옴
  @Value("${hosting.uri}")
  private String hostingUri;

  public String getLoginInfo(@RequestParam(required = false) String searchKeyWord, HttpServletRequest request, Model model) {

    List<CardInfo> cardInfos = null;

    System.out.println("hostingUri : " + hostingUri);

    String userNo = utils.getUserNo(request);

    if(userNo != "") {
      int UserNo = Integer.parseInt(userNo);
      OAuthClient oAuthClient = oAuthClientRepository.findByNoAndUseYN(UserNo, 'Y');

      // payload에서 cardNo 값을 추출 (숫자 형태로 변환)
      if(searchKeyWord != null && !searchKeyWord.isEmpty()){
        System.out.println("searchKeyWord : " + searchKeyWord);
        cardInfos = cardInfoRepository.findTop100ByUseYNAndNameContainingOrCompanyContainingOrPositionContainingOrderByNoDesc('Y', searchKeyWord, searchKeyWord, searchKeyWord);
      } else {
        cardInfos = cardInfoRepository.findTop100ByRegUserNoAndUseYNOrderByNoDesc(UserNo, 'Y');
      }

      if (oAuthClient != null) {
        System.out.println("******************** " + oAuthClient);
        model.addAttribute("email", oAuthClient.getEmail());
        model.addAttribute("name", oAuthClient.getName());

        //메인 사용자 프로필 사진
        if (oAuthClient.getFileNo() > 0) {
          model.addAttribute("PhotoNo", hostingUri + "/file/uri/" + oAuthClient.getFileNo());
          System.out.println("oAuthClient.getFileNo() : " + oAuthClient.getFileNo());
        }

      }
    }


    HttpSession session = request.getSession();
    CustomOAuth2User social_userinfo = null;
    social_userinfo = UserUtils.getCustomOAuth2User(request);
    log.info("social_userinfo : {}", social_userinfo);

    // 소셜로그인 값이 있는경우
    if (social_userinfo != null) {

      model.addAttribute("issuer", social_userinfo.getIssuer());
      model.addAttribute("name", social_userinfo.getName());
      model.addAttribute("email", social_userinfo.getEmail());

      log.info("social model : {}", model);
      //return "main";
    }

    // 토큰 인증 실패시 로그아웃 처리
    if(userNo.equals("invaildToken")) {
      System.out.println("invaildToken");
      return "redirect:" + hostingUri + "/oauth2/logout";
    }

    System.out.println("userNo : " + userNo);

    if(cardInfos != null){
      System.out.println("cardInfos : " + cardInfos);
      model.addAttribute("cardInfos", cardInfos);
      model.addAttribute("cardPictureUri", hostingUri + "/file/uri/"); // 명함 프로필+명함사진
    }

    return "main";
  }

  public OAuthClient userInfo (HttpServletRequest request) {

    //쿠키 값 확인
    Cookie[] cookies = request.getCookies();
    OAuthClient oAuthClient = null;

    if (cookies != null) {
      for (Cookie cookie : cookies) {
        if ("access_token".equals(cookie.getName())) {

          List<JWK> jwks = jwkSet.getKeys();

          String token = cookie.getValue();

          System.out.println("userinfo token = " + token);

          try{

            // JwtDecoder를 사용하여 토큰 디코딩
            Jwt jwt = jwtDecoder.decode(token);

            // 🔹 디버깅 로그 출력 (토큰 클레임 및 만료 시간)
            System.out.println("Decoded JWT claims: " + jwt.getClaims());

            // "sub" 클레임 추출
            String userNo = (String) jwt.getClaims().get("userNo");
            String email = (String) jwt.getClaims().get("sub");
            String name = (String) jwt.getClaims().get("username");

            oAuthClient = OAuthClient.builder()
                    .no(Integer.parseInt(userNo))
                    .email(email)
                    .name(name)
                    .build();

          } catch (JwtException e) {
            // 토큰 처리 중 오류가 발생한 경우 로그아웃처리

          }

        }
      }

    }

    return oAuthClient;
  }

  public boolean Signup (@RequestBody OauthReqDTO oauthReqDTO) {

    boolean status = false;

      try {

        System.out.println("oauthReqDTO = " + oauthReqDTO);

        OAuthClient oAuthClient = OAuthClient.builder()
                .name(oauthReqDTO.getName())
                .email(oauthReqDTO.getEmail())
                .issuer("LOCAL")
                .pwd(oauthReqDTO.getPwd())
                //.profilePictureUrl("http://localhost:9000")
                .useYN('Y')
                .build();

        oAuthClient.setPwd(passwordEncoder.encode(oAuthClient.getPwd())); // 암호화 처리
        System.out.println("OAuthService save ");
        System.out.println("oAuthClient = " + oAuthClient);

        OAuthClient savedClient = oAuthClientRepository.save(oAuthClient);
        if (savedClient == null) {
          System.out.println("저장 실패");
          return false;
        }
        System.out.println("저장 성공: " + savedClient);
        return true;
      } catch (Exception e) {
        System.out.println("예외 발생: " + e.getMessage());
        e.printStackTrace();
        return false;
      }

  }

  public boolean signIn (Model model, @RequestBody OauthReqDTO oauthReqDTO, HttpServletResponse response, HttpSession session) {
    boolean status = true;
    try {
      System.out.println("oauthReqDTO = " + oauthReqDTO);
      Map<String, String> resultMap = getToken(oauthReqDTO);
      String access_token = resultMap.get("access_token");

      System.out.println("access_token = " + access_token);

      Cookie cookie = new Cookie("access_token", access_token);

      cookie.setHttpOnly(true); // JavaScript에서 접근 불가
      //cookie.setSecure(true); // HTTPS에서만 전송
      cookie.setPath("/"); //
      cookie.setMaxAge(session.getMaxInactiveInterval());
      response.addCookie(cookie);

//      model.addAttribute("cafeList", postRepository.findTop10ByMenuNoBoardNoType(1, Sort.by(Sort.Order.desc("no"))));
//      model.addAttribute("blogList", postRepository.findTop10ByMenuNoBoardNoType(2, Sort.by(Sort.Order.desc("no"))));

    } catch (Exception e) {
      status = false;
      log.info("status : {}", status);
      log.info("Exception occurred: {}", e);

    }

    return status;
  }

  public Map<String, String> getToken(OauthReqDTO oauthReqDTO) {
    MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
    formData.add("grant_type","client_credentials");
    formData.add("client_id", oauthReqDTO.getEmail());
    formData.add("client_secret", oauthReqDTO.getPwd());
    //formData.add("scope", "openid profile");  // ✅ 스코프 추가
    System.out.println("getToken start");

    return RestClient.create().post()
            .uri(hostingUri + "/oauth2/token")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .body(formData)
            .retrieve()
            .toEntity(Map.class)
            .getBody();
  }

  public String logout(Model model, HttpServletResponse response) {

    System.out.println("logout test");
    // cookie 초기화
    ResponseCookie targetCookie = ResponseCookie.from("access_token", "")
            .httpOnly(true)
            //.secure(true)
            .path("/")
            .maxAge(0)
            .build();
    response.addHeader(HttpHeaders.SET_COOKIE, targetCookie.toString());

//    model.addAttribute("cafeList", postRepository.findTop10ByMenuNoBoardNoType(1, Sort.by(Sort.Order.desc("no"))));
//    model.addAttribute("blogList", postRepository.findTop10ByMenuNoBoardNoType(2, Sort.by(Sort.Order.desc("no"))));

    return "main";
  }

  public boolean UserInfoUpdate (@RequestParam(value = "file", required = false) MultipartFile file,
                                 @RequestParam("email") String email,
                                 @RequestParam("name") String name,
                                 @RequestParam("pwd") String pwd,
                                 HttpServletRequest request) {

    // 로그인 (Token에 담겨 있는 사용자 정보로 User 테이블 PK 값 가져오기)

    try {
      String userNo = utils.getUserNo(request);
      // 토큰 인증 실패시 로그아웃 처리
      if(userNo.equals("invaildToken")) { // userNo 값이 비어있으면 false 처리
        return false;
      }

      OAuthClient oAuthClient = oAuthClientRepository.findById(Integer.parseInt(userNo)).orElseThrow();

      if(file != null) {
        FileResDTO fileResDTO = fileService.upload(file, Integer.parseInt(userNo));
        FileDTO fileDTO = fileResDTO.getFile();
        oAuthClient.setFileNo(fileDTO.getNo());
        System.out.println("fileDTO.getNo() : " + fileDTO.getNo());
      }

      oAuthClient.setName(name);
      oAuthClient.setPwd(passwordEncoder.encode(pwd)); // 암호화 처리

      oAuthClientRepository.save(oAuthClient);
    }
    catch ( Exception e ){
      System.out.println("Exception : " + e);
      return false;
    }


    return true;
  }


  public String MyPageInfo(HttpServletRequest request, Model model) {

    System.out.println("Start MyPageInfo");

    String userNo = utils.getUserNo(request);
    // 토큰 인증 실패시 로그아웃 처리
    if(userNo.equals("invaildToken")) {
      System.out.println("invaildToken");
      return "redirect:" + hostingUri + "/oauth2/logout";
    }

    OAuthClient oAuthClient = oAuthClientRepository.findById(Integer.parseInt(userNo)).orElseThrow();

    if (oAuthClient.getFileNo() > 0) {
      model.addAttribute("PhotoNo", hostingUri + "/file/uri/" + oAuthClient.getFileNo());

    }

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm");
    String regDateStr = oAuthClient.getRegDate().format((formatter));
    oAuthClient.setParsRegDate(regDateStr);

    model.addAttribute("email", oAuthClient.getEmail());
    model.addAttribute("oAuthClient", oAuthClient);


    return "MyPageInfo";
  }

  public String MyPageEdit(HttpServletRequest request, Model model) {

    System.out.println("Start MyPageEdit");

    String userNo = utils.getUserNo(request);
    // 토큰 인증 실패시 로그아웃 처리
    if(userNo.equals("invaildToken")) {
      System.out.println("invaildToken");
      return "redirect:" + hostingUri + "/oauth2/logout";
    }

    OAuthClient oAuthClient = oAuthClientRepository.findById(Integer.parseInt(userNo)).orElseThrow();

    if (oAuthClient.getFileNo() != 0) {
      model.addAttribute("PhotoNo", hostingUri + "/file/uri/" + oAuthClient.getFileNo());

    }
    model.addAttribute("email", oAuthClient.getEmail());
    model.addAttribute("oAuthClient", oAuthClient);

    return "MyPageEdit";
  }

}
