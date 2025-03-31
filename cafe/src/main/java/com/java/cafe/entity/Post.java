package com.java.cafe.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "post")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @ManyToOne
    @JoinColumn(name="menuNo", referencedColumnName = "no", nullable = false)
    private Menu menu;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false, insertable = false, updatable = false)
    private Integer regUserNo;

    @Column(nullable = false)
    @CreationTimestamp
    @JsonFormat(pattern = "yyyy.MM.dd. HH:mm")
    private LocalDateTime regDate;

    @Column
    private Integer modUserNo;
    private LocalDateTime modDate;

    @Column(nullable = false)
    private Integer viewCount;

    @Column(nullable = false)
    private char useYN;

    @OneToOne
    @JoinColumn(name = "regUserNo", referencedColumnName = "no")
    private User user;

}