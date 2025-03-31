# :zap: PortFolio 프로젝트 소개

:sparkles: 포트폴리오 소개 사이트입니다. :sparkles:

## :calendar: 개발인원 및 기간
- 5인 개발 2025.03.10 ~ 2025.05.16(50일 소요)
## :dart: 개발 목적
- 기업제출용 포트폴리오 소개 사이트가 필요하여 만들게 되었습니다.

## :hammer_and_wrench: 적용 기술
## `BACK-END`
### :zap: Spring Boot
- Rest API로 구현하기 위하여 RestController를 이용한 JSON 데이터 제공과 기능 테스트를 위하여 Spring Docs (swagger-ui)를 활용하여 URL 호출 테스트가 되도록 문서화 하였습니다.
- Spring Data JPA를 적용하여 ORM (Object Relational Mapping) 으로 Database와 Java 연결 되도록 객체지향적 데이터 제어 및 Entity 구현 하였습니다.

### :zap: Maven
- 프로젝트 의존성 관리를 `Maven`으로 외부 라이브러리를 자동으로 다운로드 하고 관리하였습니다.
- 프로젝트 Test 및 Build 등의 작업을 자동화 할 수 있도록 이용하였습니다.

## `FRONT-END`
### :zap: React
- Component로 페이지를 분리시켰으며, `Nav`, `Footer`로 분리하여 작성하였습니다.
- react-router-dom의 `Link`, `Route`를 사용하여 작성된 `Component`를 불러올 수 있습니다.

### :zap: Vite
- WebPack을 사용하는 대신 Vite라는 2세대 번들링 툴을 사용하여 서버에서 작동하는 JS의 크기를 줄이고 속도를 높였습니다.

## :tada: Docker를 이용한 Nginx로 배포
- 정적 사이트을 쉽게 배포할 수 있는 [Docker](https://docs.docker.com/)을 이용하여 React-Vite를 배포하였습니다.
- 더 자세한 내용을 보고 싶으시다면 [Docker hub NGINX](https://hub.docker.com/_/nginx) 페이지를 참고하세요.
