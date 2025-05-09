package com.sns_backend1.repository;

import com.sns_backend1.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    List<User> findByUsernameContainingIgnoreCase(String username);

    // 👇 following 즉시 로딩
    @EntityGraph(attributePaths = "following")
    Optional<User> findUserWithFollowingByEmail(String email);

    @EntityGraph(attributePaths = "followers")
    Optional<User> findUserWithFollowersById(Long id);

    @EntityGraph(attributePaths = "following")
    Optional<User> findUserWithFollowingById(Long id);
}
