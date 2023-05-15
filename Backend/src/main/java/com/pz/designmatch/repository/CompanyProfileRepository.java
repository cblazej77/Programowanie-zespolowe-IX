package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Long> {
    Optional<CompanyProfile> findByName(String name);
    Boolean existsCompanyProfileByName(String name);
}
