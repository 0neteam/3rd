package com.app.giticon_pr.controller;

import com.app.giticon_pr.mapper.GifticonMapper;
import com.app.giticon_pr.model.Gifticon;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gifticons")
public class GifticonController {

    private final GifticonMapper gifticonMapper;

    public GifticonController(GifticonMapper gifticonMapper) {
        this.gifticonMapper = gifticonMapper;
    }

    // 전체 기프티콘 목록 조회
    @GetMapping
    public List<Gifticon> findAll() {
        return gifticonMapper.findAll();
    }

    // 브랜드 필터 조회
    @GetMapping("/brand/{brand}")
    public List<Gifticon> findByBrand(@PathVariable("brand") String brand) {
        return gifticonMapper.findByBrand(brand);
    }

    // 검색어로 이름 조회
    @GetMapping("/search")
    public List<Gifticon> searchByKeyword(@RequestParam("keyword") String keyword) {
        return gifticonMapper.searchByKeyword(keyword);
    }

    // 특정 ID로 상세조회
    @GetMapping("/{id}")
    public Gifticon findById(@PathVariable("id") Long id) {
        return gifticonMapper.findById(id);
    }

    // 기프티콘 등록
    @PostMapping
    public void insert(@RequestBody Gifticon gifticon) {
        gifticonMapper.insert(gifticon);
    }

    // 기프티콘 수정
    @PutMapping("/{id}")
    public void update(@PathVariable("id") Long id, @RequestBody Gifticon gifticon) {
        gifticon.setId(id);
        gifticonMapper.update(gifticon);
    }

    // 기프티콘 삭제
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        gifticonMapper.deleteById(id);
    }
}
