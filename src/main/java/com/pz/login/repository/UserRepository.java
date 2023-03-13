package com.pz.login.repository;

import com.pz.login.model.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Boolean existsByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    Boolean existsByEmail(String email);
}
