package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.PortfolioImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface PortfolioImagesRepository extends JpaRepository<PortfolioImages, Long> {
    Optional<Set<PortfolioImages>> findAllByArtistProfile_User_Username(String username);
    Optional<PortfolioImages> findById(Long id);
}
