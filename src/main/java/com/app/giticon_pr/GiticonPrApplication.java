package com.app.giticon_pr;

import org.mybatis.spring.annotation.MapperScan; // ✅ 이거 추가!
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.app.giticon_pr.mapper") // ✅ 여기에 MapperScan 추가!
@SpringBootApplication
public class GiticonPrApplication {

    public static void main(String[] args) {
        SpringApplication.run(GiticonPrApplication.class, args);
    }
}
