package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EducationRepository extends JpaRepository<Education, Long> {
    Optional<Education> findByArtistProfile_User_Username(String username);
}
