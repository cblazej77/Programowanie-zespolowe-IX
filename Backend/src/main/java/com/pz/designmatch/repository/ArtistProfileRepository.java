package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.ArtistProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArtistProfileRepository extends JpaRepository<ArtistProfile, Long> {
    Optional<ArtistProfile> findByUser_Username(String username);
    Optional<ArtistProfile> findByUser_Id(Long id);
}
