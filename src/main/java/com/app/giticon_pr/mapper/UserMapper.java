package com.app.giticon_pr.mapper;

import com.app.giticon_pr.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    // 회원가입 (insert)
    void insertUser(UserDto user);

    // 아이디(username)로 조회 (로그인용)
    UserDto findByUsername(@Param("username") String username);
}
