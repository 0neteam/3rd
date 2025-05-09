CREATE TABLE IF NOT EXISTS favorite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  gifticon_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (user_id, gifticon_id)
);

CREATE TABLE IF NOT EXISTS gifticon (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  brand VARCHAR(50) NOT NULL,
  face_value INT NOT NULL,
  price INT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  expire_date DATE NOT NULL
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


INSERT INTO gifticon (id, name, brand, face_value, price, image_url, expire_date)
VALUES
(1, '배달의민족 상품권 15000원권', '배달의민족', 15000, 11800, 'https://example.com/images/baemin.jpg', '2025-04-27'),
(2, '이디야 상품권 5000원권', '이디야', 5000, 3600, 'https://example.com/images/ediya.jpg', '2025-05-07'),
(3, '스타벅스 상품권 30000원권', '스타벅스', 30000, 23300, 'https://example.com/images/starbucks.jpg', '2025-05-17'),
(4, '네이버페이 상품권 5000원권', '네이버페이', 5000, 3400, 'https://example.com/images/naverpay.jpg', '2025-05-27'),
(5, 'CU 상품권 30000원권', 'CU', 30000, 26900, 'https://example.com/images/cu.jpg', '2025-06-06'),
(6, '투썸플레이스 상품권 20000원권', '투썸플레이스', 20000, 11200, 'https://example.com/images/twosome.jpg', '2025-06-16'),
(7, 'GS25 상품권 10000원권', 'GS25', 10000, 6200, 'https://example.com/images/gs25.jpg', '2025-06-26'),
(8, '카카오 상품권 15000원권', '카카오', 15000, 10000, 'https://example.com/images/kakao.jpg', '2025-07-06'),
(9, '마켓컬리 상품권 30000원권', '마켓컬리', 30000, 20700, 'https://example.com/images/marketkurly.jpg', '2025-07-16'),
(10, '네이버페이 상품권 15000원권', '네이버페이', 15000, 13200, 'https://example.com/images/naverpay.jpg', '2025-07-26'),
(11, 'GS25 상품권 15000원권', 'GS25', 15000, 10200, 'https://example.com/images/gs25.jpg', '2025-08-05'),
(12, 'GS25 상품권 15000원권', 'GS25', 15000, 8200, 'https://example.com/images/gs25.jpg', '2025-08-15'),
(13, '투썸플레이스 상품권 15000원권', '투썸플레이스', 15000, 8400, 'https://example.com/images/twosome.jpg', '2025-08-25'),
(14, 'CU 상품권 20000원권', 'CU', 20000, 10100, 'https://example.com/images/cu.jpg', '2025-09-04'),
(15, 'GS25 상품권 20000원권', 'GS25', 20000, 16600, 'https://example.com/images/gs25.jpg', '2025-09-14'),
(16, '마켓컬리 상품권 5000원권', '마켓컬리', 5000, 2700, 'https://example.com/images/marketkurly.jpg', '2025-09-24'),
(17, 'GS25 상품권 5000원권', 'GS25', 5000, 2900, 'https://example.com/images/gs25.jpg', '2025-10-04'),
(18, '올리브영 상품권 5000원권', '올리브영', 5000, 3600, 'https://example.com/images/oliveyoung.jpg', '2025-10-14'),
(19, 'CU 상품권 30000원권', 'CU', 30000, 23600, 'https://example.com/images/cu.jpg', '2025-10-24'),
(20, '올리브영 상품권 20000원권', '올리브영', 20000, 10900, 'https://example.com/images/oliveyoung.jpg', '2025-11-03'),
(21, '이디야 상품권 15000원권', '이디야', 15000, 11400, 'https://example.com/images/ediya.jpg', '2025-11-13'),
(22, '배달의민족 상품권 5000원권', '배달의민족', 5000, 3400, 'https://example.com/images/baemin.jpg', '2025-11-23'),
(23, 'CU 상품권 30000원권', 'CU', 30000, 25500, 'https://example.com/images/cu.jpg', '2025-12-03'),
(24, '이디야 상품권 15000원권', '이디야', 15000, 11400, 'https://example.com/images/ediya.jpg', '2025-12-13'),
(25, '이디야 상품권 20000원권', '이디야', 20000, 18100, 'https://example.com/images/ediya.jpg', '2025-12-23'),
(26, 'GS25 상품권 20000원권', 'GS25', 20000, 15200, 'https://example.com/images/gs25.jpg', '2026-01-02'),
(27, '마켓컬리 상품권 10000원권', '마켓컬리', 10000, 5500, 'https://example.com/images/marketkurly.jpg', '2026-01-12'),
(28, '올리브영 상품권 20000원권', '올리브영', 20000, 16600, 'https://example.com/images/oliveyoung.jpg', '2026-01-22'),
(29, '올리브영 상품권 15000원권', '올리브영', 15000, 9700, 'https://example.com/images/oliveyoung.jpg', '2026-02-01'),
(30, '이디야 상품권 20000원권', '이디야', 20000, 13800, 'https://example.com/images/ediya.jpg', '2026-02-11'),
(31, '배달의민족 상품권 10000원권', '배달의민족', 10000, 9500, 'https://example.com/images/baemin.jpg', '2026-02-21'),
(32, '네이버페이 상품권 30000원권', '네이버페이', 30000, 17100, 'https://example.com/images/naverpay.jpg', '2026-03-03'),
(33, 'GS25 상품권 5000원권', 'GS25', 5000, 3000, 'https://example.com/images/gs25.jpg', '2026-03-13'),
(34, '투썸플레이스 상품권 20000원권', '투썸플레이스', 20000, 17800, 'https://example.com/images/twosome.jpg', '2026-03-23'),
(35, '마켓컬리 상품권 20000원권', '마켓컬리', 20000, 18700, 'https://example.com/images/marketkurly.jpg', '2026-04-02'),
(36, '카카오 상품권 15000원권', '카카오', 15000, 12900, 'https://example.com/images/kakao.jpg', '2026-04-12'),
(37, '네이버페이 상품권 20000원권', '네이버페이', 20000, 16300, 'https://example.com/images/naverpay.jpg', '2026-04-22'),
(38, '올리브영 상품권 20000원권', '올리브영', 20000, 18900, 'https://example.com/images/oliveyoung.jpg', '2026-05-02'),
(39, '마켓컬리 상품권 10000원권', '마켓컬리', 10000, 9200, 'https://example.com/images/marketkurly.jpg', '2026-05-12'),
(40, 'CU 상품권 20000원권', 'CU', 20000, 12400, 'https://example.com/images/cu.jpg', '2026-05-22'),
(41, '이디야 상품권 15000원권', '이디야', 15000, 11100, 'https://example.com/images/ediya.jpg', '2026-06-01'),
(42, '올리브영 상품권 5000원권', '올리브영', 5000, 4000, 'https://example.com/images/oliveyoung.jpg', '2026-06-11'),
(43, 'GS25 상품권 30000원권', 'GS25', 30000, 20400, 'https://example.com/images/gs25.jpg', '2026-06-21'),
(44, '올리브영 상품권 5000원권', '올리브영', 5000, 3900, 'https://example.com/images/oliveyoung.jpg', '2026-07-01'),
(45, '마켓컬리 상품권 5000원권', '마켓컬리', 5000, 3700, 'https://example.com/images/marketkurly.jpg', '2026-07-11'),
(46, 'GS25 상품권 30000원권', 'GS25', 30000, 22200, 'https://example.com/images/gs25.jpg', '2026-07-21'),
(47, '마켓컬리 상품권 15000원권', '마켓컬리', 15000, 13300, 'https://example.com/images/marketkurly.jpg', '2026-07-31'),
(48, '올리브영 상품권 5000원권', '올리브영', 5000, 4700, 'https://example.com/images/oliveyoung.jpg', '2026-08-10'),
(49, '투썸플레이스 상품권 10000원권', '투썸플레이스', 10000, 6200, 'https://example.com/images/twosome.jpg', '2026-08-20'),
(50, '이디야 상품권 30000원권', '이디야', 30000, 25100, 'https://example.com/images/ediya.jpg', '2026-08-30');

-- 데이터 50개 출력 확인
SELECT * FROM gifticon ORDER BY id LIMIT 50;

--  개수 확인 (결과: 50)
SELECT COUNT(*) FROM gifticon;
