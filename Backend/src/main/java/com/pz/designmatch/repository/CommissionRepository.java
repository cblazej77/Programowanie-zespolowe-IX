package com.pz.designmatch.repository;

import com.pz.designmatch.model.Commission;
import com.pz.designmatch.model.user.ArtistProfile;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommissionRepository extends JpaRepository<Commission, Long> {
   Optional<Commission> findByTitle(String title);
   Page<Commission> findAll(@NotNull Specification<Commission> specification, Pageable pageable);
}
