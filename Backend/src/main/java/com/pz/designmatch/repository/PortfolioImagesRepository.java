package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.PortfolioEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PortfolioImagesRepository extends JpaRepository<PortfolioEntry, Long> {

    void deleteByArtistProfile_User_UsernameAndId(String username, Long imageId);

    Optional<PortfolioEntry> findById(Long id);

    Page<PortfolioEntry> findAllByArtistProfile(ArtistProfile artistProfile, Pageable pageable);
}
