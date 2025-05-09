package com.sns_backend1.controller;

import com.sns_backend1.service.ImageUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageImageController {

    private final ImageUploadService imageUploadService;

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestPart MultipartFile file) {
        String imageUrl = imageUploadService.uploadImage(file);
        return ResponseEntity.ok(imageUrl);
    }
}
