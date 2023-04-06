package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Boolean existsByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<UserEntity> findByUsername(String username);
}
