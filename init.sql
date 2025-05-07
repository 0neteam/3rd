CREATE TABLE IF NOT EXISTS favorite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  gifticon_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_favorite (user_id, gifticon_id)
);