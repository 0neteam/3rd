package com.java.blog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "`user`")  // MySQL에서 user는 예약어일 수 있으므로 백틱 사용
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @Column(length = 50)
    private String email;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 50, nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'LOCAL'")
    private String issuer;

    @Column(length = 100)
    private String oauthId;

    @Column(nullable = false)
    private Integer fileNo;

    @Column(length = 255)
    private String pwd;

    @Column(nullable = false)
    private LocalDateTime regDate;

    @Column(nullable = false, columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private char useYN;
}
