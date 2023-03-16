package com.pz.login.repository;

import com.pz.login.model.user.CompanyProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Integer> {
}
