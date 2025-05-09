package com.app.giticon_pr.service;

import com.app.giticon_pr.dto.UserDto;
import com.app.giticon_pr.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.dao.DuplicateKeyException; // ⬅️ 이거 추가해야 함

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    public void register(UserDto userDto) {
        System.out.println("▶ 회원가입 시도: " + userDto.getUsername());
        try {
            userMapper.insertUser(userDto);
            System.out.println("✅ insertUser 실행 완료");
        } catch (DuplicateKeyException e) {
            System.out.println("❌ 중복 사용자입니다.");
            throw new RuntimeException("❌ 이미 존재하는 사용자입니다.");
        } catch (Exception e) {
            System.out.println("❌ 다른 예외 발생: " + e.getMessage());
            throw new RuntimeException("❌ 회원가입 실패: " + e.getMessage());
        }
    }
    
    public boolean login(String username, String password) {
        UserDto user = userMapper.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}