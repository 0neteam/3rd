package com.sns_backend1.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class ImageUploadService {

    private static final String UPLOAD_DIR = "uploads/";

    /**
     * 이미지를 업로드하고 접근 가능한 경로를 반환합니다.
     * @param file Multipart 업로드 파일
     * @return /uploads/파일명 또는 null
     */
    public String uploadImage(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            // ❗ 빈 파일일 경우 예외를 던지지 않고 null 반환
            return null;
        }

        try {
            // 디렉토리 없으면 생성
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 확장자 추출 및 저장 파일명 생성
            String originalFilename = file.getOriginalFilename();
            String extension = "";

            int dotIndex = originalFilename.lastIndexOf(".");
            if (dotIndex > 0) {
                extension = originalFilename.substring(dotIndex);
            }

            String savedFileName = UUID.randomUUID() + extension;
            Path filePath = uploadPath.resolve(savedFileName);

            // 저장
            Files.write(filePath, file.getBytes());

            // 정적 경로로 접근할 수 있도록 상대 URL 반환
            return "/uploads/" + savedFileName;

        } catch (IOException e) {
            throw new RuntimeException("이미지 업로드 실패", e);
        }
    }
}
