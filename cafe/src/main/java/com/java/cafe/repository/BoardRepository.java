package com.java.cafe.repository;

import com.java.cafe.entity.Board;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer>{
    
    public List<Board> findByTypeAndUseYN(int type, char useYN, Sort cafeLSort);
    public List<Board> findByTypeAndUseYNAndNameContainingIgnoreCaseOrderByRegDateDesc(Integer type, char useYN, String keyward);
    public Optional<Board> findByTypeAndDomain(Integer type, String domain);

}
