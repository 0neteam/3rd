-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.7.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- card 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `card` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `card`;

-- 테이블 card.card 구조 내보내기
CREATE TABLE IF NOT EXISTS `card` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `adr` varchar(255) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `filePictureNo` int(11) DEFAULT NULL,
  `fileUserNo` int(11) DEFAULT NULL,
  `memo` varchar(255) DEFAULT NULL,
  `modDate` datetime(6) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `position` varchar(150) DEFAULT NULL,
  `regDate` datetime(6) NOT NULL,
  `regUserNo` int(11) NOT NULL,
  `tel` varchar(20) NOT NULL,
  `useYN` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 card.card:~16 rows (대략적) 내보내기
INSERT IGNORE INTO `card` (`no`, `adr`, `company`, `email`, `fax`, `filePictureNo`, `fileUserNo`, `memo`, `modDate`, `name`, `position`, `regDate`, `regUserNo`, `tel`, `useYN`) VALUES
	(1, NULL, '스타쉽 엔터테인먼트', NULL, NULL, 20, 1, NULL, '2025-04-03 11:54:57.862161', '장원영', NULL, '2025-04-02 12:28:58.880228', 1, '010-1234-5678', 'N'),
	(2, NULL, 'MAA', NULL, NULL, 5, 4, NULL, '2025-04-03 00:16:57.135787', '고윤정', NULL, '2025-04-02 12:52:16.923393', 1, '010-2345-6789', 'Y'),
	(3, '서울 강남구 역삼동 123-45', 'DummyTech Inc.', 'contact@dummywebsite.com', '02-123-4567', 0, 0, '"혁신적인 제품 개발을 위해 최선을 다합니다."', '2025-04-02 17:23:56.816637', '김민수', 'Product Manager', '2025-04-02 12:53:25.863516', 1, '010-1234-5678', 'N'),
	(4, '서울 강남구 삼성동 234-56', 'TechWorks Solutions', 'support@dummyservice.com', '02-234-5678', 0, 0, '"최고의 기술로 미래를 만들어갑니다."', '2025-04-02 17:24:00.454867', '이지은', 'Chief Technology Officer', '2025-04-02 13:07:09.138309', 1, '010-2345-6789', 'N'),
	(5, NULL, '웨이크', NULL, NULL, 7, 6, NULL, '2025-04-03 00:18:51.714448', '조유리', NULL, '2025-04-02 13:12:23.721415', 1, '010-9870-1231', 'Y'),
	(6, NULL, '빅펀치엔터테인먼트', NULL, NULL, 9, 8, NULL, '2025-04-03 08:47:58.324677', '마동석', NULL, '2025-04-02 13:14:50.697673', 1, '010-9989-8899', 'Y'),
	(7, NULL, NULL, NULL, NULL, 11, 10, NULL, '2025-04-02 14:55:56.262721', '김동현', NULL, '2025-04-02 14:55:56.262721', 1, '010-6789-1234', 'Y'),
	(8, NULL, NULL, NULL, NULL, 13, 12, NULL, '2025-04-02 16:32:35.132805', '백진희', NULL, '2025-04-02 16:32:35.132805', 1, '010-2345-6789', 'Y'),
	(9, NULL, NULL, NULL, NULL, 15, 14, NULL, '2025-04-02 16:34:06.475456', '정소민', NULL, '2025-04-02 16:34:06.475456', 1, '010-5678-9012', 'Y'),
	(10, NULL, NULL, NULL, NULL, 17, 16, NULL, '2025-04-02 17:25:31.147468', '김세정', NULL, '2025-04-02 17:25:31.147468', 1, '010-1234-6789', 'Y'),
	(11, '서울 강남구 역삼동 123-45', 'DummyTech Inc.', 'contact@dummywebsite.com', '02-123-4567', 0, 0, '"혁신적인 제품 개발을 위해 최선을 다합니다."', '2025-04-02 17:27:50.957231', '김민수', 'Product Manager', '2025-04-02 17:27:50.957231', 1, '010-1234-5678', 'Y'),
	(12, '서울 강남구 삼성동 234-56', 'TechWorks Solutions', 'support@dummyservice.com', '02-234-5678', 0, 18, '"최고의 기술로 미래를 만들어갑니다."', '2025-04-03 11:52:55.634327', '장원영', 'Chief Technology Officer', '2025-04-02 17:28:14.352466', 1, '010-2345-6789', 'Y'),
	(13, '서울 송파구 방이동 345-67', 'Digital Innovations', 'info@dummystore.com', '02-345-6789', 21, 0, '"사용자를 위한 최고의 소프트웨어를 개발합니다."', '2025-04-03 11:39:10.894531', '박정훈', 'Software Engineer', '2025-04-02 17:28:45.768985', 1, '010-3456-7890', 'N'),
	(14, '서울 마포구 합정동 456-78', 'Global Enterprises', 'hello@dummycompany.com', '02-456-7890', 0, 0, '"창의적인 마케팅 전략으로 시장을 선도합니다."', '2025-04-03 11:28:23.066952', '송하늘', 'Marketing Director', '2025-04-02 17:29:08.504403', 1, '010-4567-8901', 'N'),
	(15, '서울 용산구 한남동 567-89', 'FutureTech Solutions', 'inquiry@dummytech.com', '02-567-8901', 0, 0, '"신뢰를 바탕으로 최고의 솔루션을 제공합니다."', '2025-04-03 11:27:12.935076', '최원석', 'Sales Manager', '2025-04-02 17:29:39.649262', 1, '010-5678-9012', 'N'),
	(16, NULL, NULL, NULL, NULL, 23, 22, NULL, '2025-04-03 11:53:34.652646', '오연하', 'Marketing Coordinator', '2025-04-03 11:08:24.853945', 1, '010-2345-7890', 'Y'),
	(17, NULL, NULL, NULL, NULL, 25, 24, NULL, '2025-04-03 11:58:46.838716', '고현정', NULL, '2025-04-03 11:58:46.838716', 1, '010-2345-6789', 'Y');

-- 테이블 card.fileinfo 구조 내보내기
CREATE TABLE IF NOT EXISTS `fileinfo` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `attachPath` varchar(50) NOT NULL,
  `ext` varchar(10) NOT NULL,
  `mediaType` varchar(255) NOT NULL,
  `modDate` datetime(6) DEFAULT NULL,
  `modUserNo` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `orgin` varchar(100) NOT NULL,
  `regDate` datetime(6) NOT NULL,
  `regUserNo` int(11) NOT NULL,
  `useYN` char(1) NOT NULL,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 card.fileinfo:~16 rows (대략적) 내보내기
INSERT IGNORE INTO `fileinfo` (`no`, `attachPath`, `ext`, `mediaType`, `modDate`, `modUserNo`, `name`, `orgin`, `regDate`, `regUserNo`, `useYN`) VALUES
	(1, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 12:28:58.833665', NULL, '101607516469800', '장원영.jpg', '2025-04-02 12:28:58.833665', 1, 'Y'),
	(2, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 12:28:58.867178', NULL, '101607563390200', '제이컴페니.jpg', '2025-04-02 12:28:58.867178', 1, 'Y'),
	(3, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 12:51:07.401041', NULL, '102936080167800', 'hodol.jpg', '2025-04-02 12:51:07.401041', 1, 'Y'),
	(4, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 12:52:16.909338', NULL, '103005597167400', '고윤정.jpg', '2025-04-02 12:52:16.909338', 1, 'Y'),
	(5, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 12:52:16.916357', NULL, '103005605481400', '현대자동차.jpg', '2025-04-02 12:52:16.916357', 1, 'Y'),
	(6, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 13:12:23.705364', NULL, '104212385493900', '조유리.jpg', '2025-04-02 13:12:23.705364', 1, 'Y'),
	(7, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 13:12:23.714882', NULL, '104212397419800', '이콘비즈명함.jpg', '2025-04-02 13:12:23.714882', 1, 'Y'),
	(8, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 13:14:50.682548', NULL, '104359364066400', '마동석.jpg', '2025-04-02 13:14:50.682548', 1, 'Y'),
	(9, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 13:14:50.691052', NULL, '104359372521700', 'LG전자.jpg', '2025-04-02 13:14:50.691052', 1, 'Y'),
	(10, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 14:55:56.224846', NULL, '2607035410900', '김동현.jpg', '2025-04-02 14:55:56.224846', 1, 'Y'),
	(11, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 14:55:56.256721', NULL, '2607077708800', '김동현.jpg', '2025-04-02 14:55:56.256721', 1, 'Y'),
	(12, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 16:32:35.067937', NULL, '8405862385100', '백진희.jpg', '2025-04-02 16:32:35.067937', 1, 'Y'),
	(13, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 16:32:35.126792', NULL, '8405948031200', 'LG전자.jpg', '2025-04-02 16:32:35.126792', 1, 'Y'),
	(14, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 16:34:06.463377', NULL, '8497282163100', '정소민.jpg', '2025-04-02 16:34:06.463377', 1, 'Y'),
	(15, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 16:34:06.470463', NULL, '8497291392400', '코리안에어.jpg', '2025-04-02 16:34:06.470463', 1, 'Y'),
	(16, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 17:25:31.119025', NULL, '11581933798000', '김세정.jpg', '2025-04-02 17:25:31.119025', 1, 'Y'),
	(17, 'C:\\intellij\\final_system/upload/20250402/1', '.jpg', 'image/jpeg', '2025-04-02 17:25:31.141952', NULL, '11581962551900', '조은별.jpg', '2025-04-02 17:25:31.141952', 1, 'Y'),
	(18, 'C:\\intellij\\final_system/upload/20250403/1', '.jpg', 'image/jpeg', '2025-04-03 09:30:27.164400', NULL, '4015972693200', '장원영.jpg', '2025-04-03 09:30:27.164400', 1, 'Y'),
	(19, 'C:\\intellij\\final_system/upload/20250403/1', '.jpg', 'image/jpeg', '2025-04-03 10:35:39.358058', NULL, '7928169610200', '현대자동차.jpg', '2025-04-03 10:35:39.358058', 1, 'Y'),
	(20, 'C:\\intellij\\final_system/upload/20250403/1', '.jpg', 'image/jpeg', '2025-04-03 10:38:49.742986', NULL, '8118550621700', '이콘비즈명함.jpg', '2025-04-03 10:38:49.742986', 1, 'Y'),
	(21, 'C:\\intellij\\final_system/upload/20250403/1', '.jpg', 'image/jpeg', '2025-04-03 10:51:11.260339', NULL, '8860070787700', '코리안에어.jpg', '2025-04-03 10:51:11.260339', 1, 'Y'),
	(22, 'C:\\intellij\\final_system/upload/20250403/1', '.jpg', 'image/jpeg', '2025-04-03 11:08:24.842940', NULL, '9893663052600', '1743645967152.jpg', '2025-04-03 11:08:24.842940', 1, 'Y'),
	(23, 'C:\\intellij\\final_system/upload/20250403/1', '.jpg', 'image/jpeg', '2025-04-03 11:08:24.848915', NULL, '9893670958800', '1743646054499.jpg', '2025-04-03 11:08:24.848915', 1, 'Y'),
	(24, 'C:\\intellij\\final_system/upload/20250403/1', '.jpg', 'image/jpeg', '2025-04-03 11:58:46.811936', NULL, '12915626845600', '고현정2.jpg', '2025-04-03 11:58:46.811936', 1, 'Y'),
	(25, 'C:\\intellij\\final_system/upload/20250403/1', '.jpg', 'image/jpeg', '2025-04-03 11:58:46.833437', NULL, '12915654920100', '샘플3.jpg', '2025-04-03 11:58:46.833437', 1, 'Y');

-- 테이블 card.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `no` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `fileNo` int(11) NOT NULL,
  `issuer` varchar(50) NOT NULL DEFAULT 'LOCAL',
  `modDate` datetime(6) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `oauthId` varchar(100) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `regDate` datetime(6) NOT NULL,
  `useYN` char(1) NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 card.user:~0 rows (대략적) 내보내기
INSERT IGNORE INTO `user` (`no`, `email`, `fileNo`, `issuer`, `modDate`, `name`, `oauthId`, `pwd`, `regDate`, `useYN`) VALUES
	(1, 'ljh@naver.com', 3, 'LOCAL', '2025-04-02 12:51:07.505569', '이지현', NULL, '$2a$10$zAR4Pv.av8KSr3lEWvC4Tu7FGkXq/XqBLG14cqQUoohWT/RlJQVlK', '2025-04-02 12:28:06.383983', 'Y');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
