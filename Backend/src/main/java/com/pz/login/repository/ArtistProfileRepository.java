package com.pz.login.repository;

import com.pz.login.model.user.ArtistProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistProfileRepository extends JpaRepository<ArtistProfile, Integer>{
}
