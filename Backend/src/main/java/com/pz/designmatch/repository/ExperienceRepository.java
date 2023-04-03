package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
}
