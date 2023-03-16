package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepository extends JpaRepository<Education, Integer> {
}
