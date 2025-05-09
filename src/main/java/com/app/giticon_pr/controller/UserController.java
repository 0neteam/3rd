package com.app.giticon_pr.controller;

import com.app.giticon_pr.dto.UserDto;
import com.app.giticon_pr.service.UserService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody UserDto userDto) {
        userService.register(userDto);
        return "회원가입 성공!";
    }
    
@PostMapping("/login")
public ResponseEntity<Map<String, Object>> login(@RequestBody UserDto userDto) {
    boolean success = userService.login(userDto.getUsername(), userDto.getPassword());

    Map<String, Object> response = new HashMap<>();
    response.put("success", success);

    if (success) {
        response.put("token", "dummy-token");
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}
}