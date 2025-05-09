-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.5.2-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sns_db 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sns_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `sns_db`;

-- 테이블 sns_db.chat_room 구조 내보내기
CREATE TABLE IF NOT EXISTS `chat_room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user1_id` bigint(20) DEFAULT NULL,
  `user2_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3a0wdilod4wa2mt2ca9ef96d4` (`user1_id`),
  KEY `FKbr1wi7fg55r6opj5twlug294f` (`user2_id`),
  CONSTRAINT `FK3a0wdilod4wa2mt2ca9ef96d4` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKbr1wi7fg55r6opj5twlug294f` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.chat_room:~3 rows (대략적) 내보내기
INSERT IGNORE INTO `chat_room` (`id`, `user1_id`, `user2_id`) VALUES
	(1, 3, 3),
	(2, 1, 1),
	(3, 1, 3);

-- 테이블 sns_db.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7jok1s6lywoh0srylq8lt7tmn` (`post_id`),
  KEY `FKqm52p1v3o13hy268he0wcngr5` (`user_id`),
  CONSTRAINT `FK7jok1s6lywoh0srylq8lt7tmn` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `FKqm52p1v3o13hy268he0wcngr5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.comment:~8 rows (대략적) 내보내기
INSERT IGNORE INTO `comment` (`id`, `content`, `post_id`, `user_id`, `created_at`) VALUES
	(129, '하이', 50, 1, '2025-05-08 02:03:45.851323'),
	(130, '565115', 51, 1, '2025-05-08 05:36:24.672858'),
	(131, 'ㅎㅎㅇㅀㅇㅀㅇ456465', 52, 1, '2025-05-08 05:36:30.685732'),
	(132, 'ㄴㅇㄹㄴㄹㅇ', 52, 1, '2025-05-08 05:37:02.029721'),
	(133, 'ㅗㅗㅓ호', 53, 1, '2025-05-08 05:40:11.195555'),
	(134, '495945', 54, 1, '2025-05-08 06:03:01.745338'),
	(135, 'ㅀㅎㄹ', 56, 3, '2025-05-08 06:39:21.583673'),
	(136, 'ㄹㅇㄴㄹ', 56, 1, '2025-05-08 08:37:06.875861');

-- 테이블 sns_db.comments 구조 내보내기
CREATE TABLE IF NOT EXISTS `comments` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  `content` varchar(300) NOT NULL,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 sns_db.comments:~0 rows (대략적) 내보내기

-- 테이블 sns_db.email_verification 구조 내보내기
CREATE TABLE IF NOT EXISTS `email_verification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `verified` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.email_verification:~0 rows (대략적) 내보내기

-- 테이블 sns_db.likes 구조 내보내기
CREATE TABLE IF NOT EXISTS `likes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  `comment_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_user_post` (`user_id`,`post_id`),
  UNIQUE KEY `uniq_user_comment` (`user_id`,`comment_id`),
  UNIQUE KEY `UK2jovqhqo324cubdomovkex03b` (`user_id`,`post_id`),
  UNIQUE KEY `UKsg7vao6v9l46c3nj31fbu4wu6` (`user_id`,`comment_id`),
  KEY `fk_likes_post` (`post_id`),
  KEY `fk_likes_comment` (`comment_id`),
  CONSTRAINT `fk_likes_comment` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_likes_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_post_or_comment` CHECK (`post_id` is not null and `comment_id` is null or `post_id` is null and `comment_id` is not null)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.likes:~11 rows (대략적) 내보내기
INSERT IGNORE INTO `likes` (`id`, `user_id`, `post_id`, `comment_id`, `created_at`) VALUES
	(47, 1, NULL, 129, '2025-05-08 02:05:44'),
	(48, 1, NULL, 134, '2025-05-08 06:03:03'),
	(49, 1, 50, NULL, '2025-05-08 06:03:07'),
	(50, 1, NULL, 130, '2025-05-08 06:03:08'),
	(51, 1, NULL, 131, '2025-05-08 06:03:09'),
	(52, 1, NULL, 132, '2025-05-08 06:03:09'),
	(53, 1, NULL, 133, '2025-05-08 06:03:11'),
	(54, 3, NULL, 133, '2025-05-08 06:34:27'),
	(55, 3, 56, NULL, '2025-05-08 06:39:22'),
	(56, 3, NULL, 135, '2025-05-08 06:39:23'),
	(57, 1, 57, NULL, '2025-05-08 08:37:13');

-- 테이블 sns_db.message 구조 내보내기
CREATE TABLE IF NOT EXISTS `message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) NOT NULL,
  `chat_room_id` bigint(20) DEFAULT NULL,
  `receiver_id` bigint(20) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5i8ac68n051032d9ga7gg6i85` (`chat_room_id`),
  KEY `FK9a25x9o5r7wguarxeon2a9tmr` (`receiver_id`),
  KEY `FKbi5avhe69aol2mb1lnm6r4o2p` (`sender_id`),
  CONSTRAINT `FK5i8ac68n051032d9ga7gg6i85` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room` (`id`),
  CONSTRAINT `FK9a25x9o5r7wguarxeon2a9tmr` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKbi5avhe69aol2mb1lnm6r4o2p` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.message:~0 rows (대략적) 내보내기

-- 테이블 sns_db.notification 구조 내보내기
CREATE TABLE IF NOT EXISTS `notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `message` varchar(255) NOT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdammjl0v5xfaegi926ugx6254` (`receiver_id`),
  CONSTRAINT `FKdammjl0v5xfaegi926ugx6254` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.notification:~4 rows (대략적) 내보내기
INSERT IGNORE INTO `notification` (`id`, `created_at`, `message`, `receiver_id`, `timestamp`) VALUES
	(85, '2025-05-08 05:36:30.686733', '123123123님이 당신의 게시글에 댓글을 남겼습니다.', 3, NULL),
	(86, '2025-05-08 05:37:02.029722', '123123123님이 당신의 게시글에 댓글을 남겼습니다.', 3, NULL),
	(87, '2025-05-08 06:34:27.948736', '말티즈님이 댓글에 좋아요를 눌렀습니다.', 1, NULL),
	(88, '2025-05-08 08:37:06.892874', '123123123님이 당신의 게시글에 댓글을 남겼습니다.', 3, NULL);

-- 테이블 sns_db.notifications 구조 내보내기
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `receiver_id` bigint(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `is_read` bit(1) NOT NULL,
  `message` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 sns_db.notifications:~0 rows (대략적) 내보내기

-- 테이블 sns_db.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.post:~0 rows (대략적) 내보내기

-- 테이블 sns_db.posts 구조 내보내기
CREATE TABLE IF NOT EXISTS `posts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 sns_db.posts:~8 rows (대략적) 내보내기
INSERT IGNORE INTO `posts` (`id`, `user_id`, `content`, `image_url`, `created_at`) VALUES
	(50, 1, '05 08\r\n', NULL, '2025-05-08 02:03:41.376285'),
	(51, 1, '123123123123\r\n', NULL, '2025-05-08 02:46:03.856145'),
	(52, 3, '123123123', NULL, '2025-05-08 02:46:41.375040'),
	(53, 1, 'ㅎㅎㅍㅎㅍ', NULL, '2025-05-08 05:40:05.507853'),
	(54, 1, '5', NULL, '2025-05-08 06:02:58.259955'),
	(55, 3, '489889', NULL, '2025-05-08 06:34:10.787225'),
	(56, 3, 'ㅀ', NULL, '2025-05-08 06:39:18.004766'),
	(57, 1, '하이\r\n', NULL, '2025-05-08 08:37:11.412136');

-- 테이블 sns_db.refresh_token 구조 내보내기
CREATE TABLE IF NOT EXISTS `refresh_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `used` tinyint(1) NOT NULL,
  `expiry_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 sns_db.refresh_token:~39 rows (대략적) 내보내기
INSERT IGNORE INTO `refresh_token` (`id`, `username`, `token`, `used`, `expiry_date`) VALUES
	(1, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDAxMDcsImV4cCI6MTc0NjA2NDEwN30.S3Ai9pt3TjFc1qmXoPHlc3LlTuSwTG1QDsnbB3FN1aI', 0, '2025-05-01 01:48:27.702478'),
	(2, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDA5MTAsImV4cCI6MTc0NjA2NDkxMH0.v3v4cJPgR1jrfnBdO1xDfQu0GctxqiDHjga7SxgNas0', 0, '2025-05-01 02:01:50.274516'),
	(3, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDA5MzksImV4cCI6MTc0NjA2NDkzOX0.HRiPsnEarG9uAfUM0XpHgrCdwZaOef1BYZJAOBHguOI', 0, '2025-05-01 02:02:19.431508'),
	(4, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDE3MzUsImV4cCI6MTc0NjA2NTczNX0.juc18yWGkoeQ2_sE1yXamN0KhFriruYsfGrIlJuxrz8', 0, '2025-05-01 02:15:35.550623'),
	(5, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDI0NTQsImV4cCI6MTc0NjA2NjQ1NH0.TU7_g_Dza47jUVRwSWLP3NAXsq_HbBUNDjS1zjntdko', 0, '2025-05-01 02:27:34.370198'),
	(6, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDI4ODQsImV4cCI6MTc0NjA2Njg4NH0.o-EFh101Udymh3gO6ixctQX_p2OR-lpR2db0ngi3z3s', 0, '2025-05-01 02:34:44.795592'),
	(7, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDM4MDgsImV4cCI6MTc0NjA2NzgwOH0.vRLypAxkHo4oic3FNnvX-Wl2IgJGt8V5N5CV6oQNkik', 0, '2025-05-01 02:50:08.848655'),
	(8, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDQ0NDEsImV4cCI6MTc0NjA2ODQ0MX0.SVBdVzf3CnDsqbJUzArA5-vVRzr1ACYj-HcjOpPtZy0', 0, '2025-05-01 03:00:41.532644'),
	(9, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDQ0NDQsImV4cCI6MTc0NjA2ODQ0NH0.bHWWS2DSzlY9nyG1Mq_58wbKLeTH7mpu7kFnVkVOWkM', 0, '2025-05-01 03:00:44.762880'),
	(10, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDQ0NTMsImV4cCI6MTc0NjA2ODQ1M30.uJsh2rgytVYd4OkOao_t4q-Q8IlQlviXgnfbkRKMtq4', 0, '2025-05-01 03:00:53.189046'),
	(11, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMDQ0NjMsImV4cCI6MTc0NjA2ODQ2M30.pLNUKsApP3w5qH_0qAr548FtHdec0Sx835i-0DL-e0Y', 0, '2025-05-01 03:01:03.970975'),
	(12, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMTMxNzgsImV4cCI6MTc0NjA3NzE3OH0.LLuFt8PDBvONFLFS0ECJ8nX41myvHoLRZ6CqWAUz1hU', 0, '2025-05-01 05:26:18.643391'),
	(13, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMTQxNDgsImV4cCI6MTc0NjA3ODE0OH0.qIOxZQm3p30tRgnVN09tRE8IGMB2-BLM5BxN0obtso4', 0, '2025-05-01 05:42:28.365556'),
	(14, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMTQxNjcsImV4cCI6MTc0NjA3ODE2N30.Ze7Kdm0ZDpn0N-ykQeZOd54N4T_s0feZKn24QbjzkoM', 0, '2025-05-01 05:42:47.687229'),
	(15, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMTQzMjMsImV4cCI6MTc0NjA3ODMyM30.AJbAsdNVDTsaj9AmidrH7vnyljiopJaSeiRbVjs25K0', 0, '2025-05-01 05:45:23.502040'),
	(16, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMTQzMjgsImV4cCI6MTc0NjA3ODMyOH0.9Hn1lzkQw5rsWSxGEqBvM8YuGXGgNaix9ZVrNck73V8', 0, '2025-05-01 05:45:28.307273'),
	(17, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMTQzMzMsImV4cCI6MTc0NjA3ODMzM30.pojPzaBXd1L5wrv-nGoskUyjgNEzuUjL_kTVsjFeAac', 0, '2025-05-01 05:45:33.549573'),
	(18, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyMTUyNzMsImV4cCI6MTc0NjA3OTI3M30.OCc4ikvmaXhw8XupDbzsohN8EVPThIu79_ypJICaUTg', 0, '2025-05-01 06:01:13.206705'),
	(19, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODU4MTEsImV4cCI6MTc0NjE0OTgxMX0.PGzDxmLB2zK0Q0CRVpB18gHU9MgylakiIJiGk7ZnANo', 0, '2025-05-02 01:36:51.524651'),
	(20, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODU4MTksImV4cCI6MTc0NjE0OTgxOX0.fN3iIY0yRMFSfqQuHuE_zx0fvwulO48fs84xjIqQfQk', 0, '2025-05-02 01:36:59.450663'),
	(21, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODYwMjYsImV4cCI6MTc0NjE1MDAyNn0.qq0n61GLUK636XgUnTP8QkZIIz9rnyWkM2wuCrd2owg', 0, '2025-05-02 01:40:26.906208'),
	(22, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODYwMzMsImV4cCI6MTc0NjE1MDAzM30.EOEMO205XugHM9rs0goWI9MQKu_QCW4jNm7XypUPp84', 0, '2025-05-02 01:40:33.195202'),
	(23, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODYwODYsImV4cCI6MTc0NjE1MDA4Nn0.T_3uovLKpNm3ATkavMud-AmRGwCCbHWakbNZvz0kVXI', 0, '2025-05-02 01:41:26.209771'),
	(24, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODYxMDEsImV4cCI6MTc0NjE1MDEwMX0.1rzXDtsml5lcNVPvLxCqSWf76cJHbyUDx35WaYPmMK8', 0, '2025-05-02 01:41:41.601536'),
	(25, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODYxMTUsImV4cCI6MTc0NjE1MDExNX0.-mzzX6Zt347kFYUZ9UPPeGkuK1NEgWLBgEqCuE4UNZ0', 0, '2025-05-02 01:41:55.666976'),
	(26, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODYyNjcsImV4cCI6MTc0NjE1MDI2N30.e2NIKwN_40bowacBssSFePtr_P9vjB_AYUEvE24qiJ4', 0, '2025-05-02 01:44:27.815873'),
	(27, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODY0NTAsImV4cCI6MTc0NjE1MDQ1MH0.EL3108-Uhcm_WPqrHWX7-fP-g5zlfIGLG5U1nCVT75o', 0, '2025-05-02 01:47:30.577898'),
	(28, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODY0NjgsImV4cCI6MTc0NjE1MDQ2OH0.Dnv0NWXYyxX2o7b4pAUS7Bprd5xjBf9gjcoFLt1Dso0', 0, '2025-05-02 01:47:48.010978'),
	(29, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODY5MTksImV4cCI6MTc0NjE1MDkxOX0.jDyLcuztAuHMm3qzuNpn4oxpX99OXBhQHr6ayeTGcao', 0, '2025-05-02 01:55:19.971999'),
	(30, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODcyOTcsImV4cCI6MTc0NjE1MTI5N30.MBkRbGnaNuVjgwCQSUYJXXyk7TQdk-YV3gnQ8Ah3BhU', 0, '2025-05-02 02:01:37.423506'),
	(31, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODc0MTYsImV4cCI6MTc0NjE1MTQxNn0.331DRKIuDA_j9iKVuxSFSMUsq5eJFydj4Cu40ZVwenc', 0, '2025-05-02 02:03:36.063480'),
	(32, '111111111111', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTExMTExMTExMTEiLCJpYXQiOjE3NDUyODc0NjMsImV4cCI6MTc0NjE1MTQ2M30.jbUt5ZPE2y-IUmP9cfIfdmqfI4L0J8TNsA8MWdxo_fw', 0, '2025-05-02 02:04:23.200798'),
	(33, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODc1MDgsImV4cCI6MTc0NjE1MTUwOH0.CYAHp9GUKsiX5l01V0E9wxioYH43lRDxKSi3QTDRffE', 0, '2025-05-02 02:05:08.381551'),
	(34, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyODc4MzYsImV4cCI6MTc0NjE1MTgzNn0.pu-fXapaeAgJ9w1zh-7lB3agh1J3XoDH-i4elDD4hOc', 0, '2025-05-02 02:10:36.878905'),
	(35, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyOTM0NDUsImV4cCI6MTc0NjE1NzQ0NX0.HTD3eHmuCuHJ6TdP5Cc1JDx8fbsaAMpUyCFj2LPvDhM', 0, '2025-05-02 03:44:05.690507'),
	(36, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyOTM5MjMsImV4cCI6MTc0NjE1NzkyM30.vxSf6en7mwaD4KNgGy2P8GX5RCiR0ERcBEOxLsxFCfc', 0, '2025-05-02 03:52:03.105931'),
	(37, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyOTUyNjIsImV4cCI6MTc0NjE1OTI2Mn0.M1hNyEBsQWfg-IuNodo_TeX65sXmA7z6adAQH8TVtZ0', 0, '2025-05-02 04:14:22.690583'),
	(38, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUyOTU2MDIsImV4cCI6MTc0NjE1OTYwMn0.5nH3GXN17eFhGEmJ82kEA57dXp6ijWtScvjJYWLftwk', 0, '2025-05-02 04:20:02.323782'),
	(39, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUzMDAyNjgsImV4cCI6MTc0NjE2NDI2OH0.ww1m3L0l-qdxMJBRajYgaQvbXcD38Oek5f0DCVEhQN4', 0, '2025-05-02 05:37:48.488541'),
	(40, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUzMDEzMjgsImV4cCI6MTc0NjE2NTMyOH0.O6gntxaf9lx3QpNN5wq2lWU9j5o4iY7aU_nF8G01PVg', 0, '2025-05-02 05:55:28.410397'),
	(41, '123123123', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMxMjMxMjMiLCJpYXQiOjE3NDUzMDQ2MTcsImV4cCI6MTc0NjE2ODYxN30._GWkEdYExzZxEihxqNm0Oozix-dxMprq_lP3_IXmXcc', 0, '2025-05-02 06:50:17.387479');

-- 테이블 sns_db.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL,
  `social` bit(1) NOT NULL,
  `bio` varchar(1000) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 sns_db.users:~3 rows (대략적) 내보내기
INSERT IGNORE INTO `users` (`id`, `email`, `username`, `password`, `role`, `social`, `bio`, `profile_image_url`) VALUES
	(1, 'aaa@aaa.com', '123123123', '$2a$10$twC75T0.Q8OY4SDf0oqVSOTZhex9fQsR7bwxhOp/2K/E8G/PNW2rS', 'ADMIN', b'0', '0508 10 53\n', NULL),
	(2, '33333@333.com', '111111111', '$2a$10$GrZUPlMED5i2IX5JZ9.2zuZkYgaOorVU.zyl5ApfYqN9pIndUhWly', 'USER', b'0', NULL, NULL),
	(3, 'ehdrb6782@gmail.com', '말티즈', 'a9a3aedb-3c23-4501-9b7d-b174727b48bc', 'USER', b'1', '안녕하세요오오오\n', '/uploads/b8d85a9a-4f3d-4413-badf-36d394ac70c2.webp'),
	(6, 'ljh5432@gmail.com', '123', '$2a$10$N8VhHFkZPo4J7jH8pfIn7.i/awKG4TxaKDRA697DPVVs8hxBDcyKu', 'USER', b'0', NULL, NULL);

-- 테이블 sns_db.user_followers 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_followers` (
  `user_id` bigint(20) NOT NULL,
  `followers_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`followers_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.user_followers:~0 rows (대략적) 내보내기

-- 테이블 sns_db.user_following 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_following` (
  `follower_id` bigint(20) NOT NULL,
  `following_id` bigint(20) NOT NULL,
  PRIMARY KEY (`follower_id`,`following_id`),
  KEY `following_id` (`following_id`),
  CONSTRAINT `user_following_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_following_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- 테이블 데이터 sns_db.user_following:~2 rows (대략적) 내보내기
INSERT IGNORE INTO `user_following` (`follower_id`, `following_id`) VALUES
	(3, 1),
	(1, 3);

-- 테이블 sns_db.user_roles 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `roles` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 sns_db.user_roles:~0 rows (대략적) 내보내기

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
