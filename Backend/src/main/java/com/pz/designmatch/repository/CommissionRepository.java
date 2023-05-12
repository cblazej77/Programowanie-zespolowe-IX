package com.pz.designmatch.repository;

import com.pz.designmatch.model.Commission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommissionRepository extends JpaRepository<Commission, Long> {
   Optional<Commission> findByTitle(String title);
}
