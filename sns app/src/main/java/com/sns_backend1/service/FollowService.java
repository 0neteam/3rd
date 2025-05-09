package com.sns_backend1.service;

import com.sns_backend1.dto.UserDto;
import com.sns_backend1.model.User;
import com.sns_backend1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final UserRepository userRepository;

    @Transactional
    public void followUser(String email, Long targetUserId) {
        System.out.println("🔍 followUser 요청자 이메일: " + email + ", 대상 ID: " + targetUserId);

        User follower = userRepository.findUserWithFollowingByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("로그인한 사용자를 찾을 수 없습니다."));
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new UsernameNotFoundException("대상 사용자를 찾을 수 없습니다."));

        if (follower.getId().equals(targetUserId)) {
            throw new IllegalArgumentException("자기 자신을 팔로우할 수 없습니다.");
        }

        if (!follower.getFollowing().contains(target)) {
            follower.getFollowing().add(target);
        }

        userRepository.save(follower);
    }

    @Transactional
    public void unfollowUser(String email, Long targetUserId) {
        System.out.println("🔍 unfollowUser 요청자 이메일: " + email + ", 대상 ID: " + targetUserId);

        User follower = userRepository.findUserWithFollowingByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("로그인한 사용자를 찾을 수 없습니다."));
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new UsernameNotFoundException("대상 사용자를 찾을 수 없습니다."));

        if (follower.getFollowing().contains(target)) {
            follower.getFollowing().remove(target);
        }

        userRepository.save(follower);
    }

    @Transactional(readOnly = true)
    public boolean isFollowing(String email, Long targetUserId) {
        User user = userRepository.findUserWithFollowingByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        User target = userRepository.findById(targetUserId)
                .orElseThrow(() -> new UsernameNotFoundException("대상 사용자를 찾을 수 없습니다."));
        return user.getFollowing().contains(target);
    }

    @Transactional(readOnly = true)
    public List<UserDto> getFollowers(Long userId) {
        User user = userRepository.findUserWithFollowersById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        return user.getFollowers().stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<UserDto> getFollowing(Long userId) {
        User user = userRepository.findUserWithFollowingById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
        return user.getFollowing().stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }
}
