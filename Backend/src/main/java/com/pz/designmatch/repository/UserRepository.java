package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmailIgnoreCase(String email);

    Boolean existsByEmailIgnoreCase(String email);

    Boolean existsByUsername(String username);

    Optional<UserEntity> findByUsername(String username);
}
