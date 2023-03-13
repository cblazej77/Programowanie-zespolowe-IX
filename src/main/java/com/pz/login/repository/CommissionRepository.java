package com.pz.login.repository;

import com.pz.login.model.Commission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommissionRepository extends JpaRepository<Commission, Integer> {
}
