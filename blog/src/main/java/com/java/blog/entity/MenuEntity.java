package com.java.blog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "menu")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MenuEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer no;

    @ManyToOne
    @JoinColumn(name="boardNo", referencedColumnName = "no", nullable = false)
    BoardEntity board;

    @Column(nullable = false)
    private Integer orderNo;

    @Column(nullable = false)
    private Integer depth;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(nullable = false)
    private Integer ref;

    @Column(nullable = false)
    private char useYN;

    @OneToMany
    @JoinColumn(name = "ref")
    @OrderBy("orderNo asc")
    private List<MenuEntity> children = new ArrayList<>();

}