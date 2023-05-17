package com.pz.designmatch.repository;

import com.pz.designmatch.model.Commission;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommissionRepository extends JpaRepository<Commission, Long> {

    Optional<Commission> findById(Long id);

    Page<Commission> findAll(@NotNull Specification<Commission> specification, Pageable pageable);
}
