package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface EducationRepository extends JpaRepository<Education, Long> {
    Optional<Set<Education>> findAllByArtistProfile_User_Username(String username);

    Optional<Set<Education>> findAllByArtistProfile_Id(Long id);
}
