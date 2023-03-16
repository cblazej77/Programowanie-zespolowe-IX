package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.ArtistProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistProfileRepository extends JpaRepository<ArtistProfile, Integer> {
}
