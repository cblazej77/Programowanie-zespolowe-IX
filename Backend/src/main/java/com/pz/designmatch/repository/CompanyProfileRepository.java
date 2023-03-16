package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Integer> {
}
