package com.sns_backend1.controller;

import com.sns_backend1.dto.UserDto;
import com.sns_backend1.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowService followService;

    // ✅ 팔로우 요청
    @PostMapping("/{targetUserId}")
    public ResponseEntity<String> followUser(@AuthenticationPrincipal UserDetails userDetails,
                                             @PathVariable Long targetUserId) {
        followService.followUser(userDetails.getUsername(), targetUserId);
        return ResponseEntity.ok("팔로우 성공");
    }

    // ✅ 언팔로우 요청
    @DeleteMapping("/{targetUserId}")
    public ResponseEntity<String> unfollowUser(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable Long targetUserId) {
        followService.unfollowUser(userDetails.getUsername(), targetUserId);
        return ResponseEntity.ok("언팔로우 성공");
    }

    // ✅ 팔로우 상태 확인
    @GetMapping("/status")
    public ResponseEntity<Boolean> checkFollowStatus(@AuthenticationPrincipal UserDetails userDetails,
                                                     @RequestParam Long targetId) {
        boolean isFollowing = followService.isFollowing(userDetails.getUsername(), targetId);
        return ResponseEntity.ok(isFollowing);
    }

    // ✅ 팔로워 목록
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<UserDto>> getFollowers(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowers(userId));
    }

    // ✅ 팔로잉 목록
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<UserDto>> getFollowing(@PathVariable Long userId) {
        return ResponseEntity.ok(followService.getFollowing(userId));
    }
}
