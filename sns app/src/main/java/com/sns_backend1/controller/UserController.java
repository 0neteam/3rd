package com.sns_backend1.controller;

import com.sns_backend1.dto.AuthResponse;
import com.sns_backend1.dto.UserDto;
import com.sns_backend1.model.User;
import com.sns_backend1.service.FollowService;
import com.sns_backend1.service.ImageUploadService;
import com.sns_backend1.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;
    private final FollowService followService;
    private final ImageUploadService imageUploadService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) {
        try {
            userService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(AuthResponse.message("회원 가입 성공"));
        } catch (IllegalStateException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername());
        return ResponseEntity.ok(UserDto.fromEntity(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserProfile(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(UserDto.fromEntity(user));
    }

    @PostMapping("/follow/{targetId}")
    public ResponseEntity<AuthResponse> follow(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long targetId) {
        followService.followUser(userDetails.getUsername(), targetId);
        return ResponseEntity.ok(AuthResponse.message("팔로우 성공"));
    }

    @DeleteMapping("/follow/{targetId}")
    public ResponseEntity<AuthResponse> unfollow(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long targetId) {
        followService.unfollowUser(userDetails.getUsername(), targetId);
        return ResponseEntity.ok(AuthResponse.message("언팔로우 성공"));
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UserDto>> getFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowers(userId));
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<UserDto>> getFollowing(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowing(userId));
    }

    @GetMapping("/checkUsername")
    public ResponseEntity<Map<String, Boolean>> checkUsername(@RequestParam String username) {
        boolean exists = userService.isUsernameTaken(username);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @GetMapping("/checkEmail")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestParam String email) {
        boolean exists = userService.isEmailTaken(email);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @PutMapping(value = "/me", consumes = {"multipart/form-data"})
    public ResponseEntity<UserDto> updateProfileWithImage(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestPart(value = "bio", required = false) String bio) {

        User user = userService.findByEmail(userDetails.getUsername());

        if (profileImage != null && !profileImage.isEmpty()) {
            String imageUrl = imageUploadService.uploadImage(profileImage); // ✅ 수정됨
            user.setProfileImageUrl(imageUrl);
        }

        user.setBio(bio);
        User updated = userService.save(user);
        return ResponseEntity.ok(UserDto.fromEntity(updated));
    }

    @PutMapping("/password")
    public ResponseEntity<AuthResponse> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> request) {
        userService.changePassword(userDetails.getUsername(), request.get("oldPassword"), request.get("newPassword"));
        return ResponseEntity.ok(AuthResponse.message("비밀번호 변경 성공"));
    }

    @PutMapping("/me/text")
    public ResponseEntity<UserDto> updateProfileText(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Map<String, String> updates) {
        User user = userService.findByEmail(userDetails.getUsername());
        user.setBio(updates.get("bio"));
        user.setProfileImageUrl(updates.get("profileImageUrl"));
        User updated = userService.save(user);
        return ResponseEntity.ok(UserDto.fromEntity(updated));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam String username) {
        List<User> users = userService.searchUsersByUsername(username);
        List<UserDto> result = users.stream().map(UserDto::fromEntity).toList();
        return ResponseEntity.ok(result);
    }
}
