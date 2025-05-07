package com.app.giticon_pr.service;

import  com.app.giticon_pr.dto.UserDto;
import  com.app.giticon_pr.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public void register(UserDto userDto) {
        userMapper.insertUser(userDto);
    }

    public boolean login(String username, String password) {
        UserDto user = userMapper.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}
