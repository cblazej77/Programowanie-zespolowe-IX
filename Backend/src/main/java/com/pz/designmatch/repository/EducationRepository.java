package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface EducationRepository extends JpaRepository<Education, Long> {
    Set<Education> findAllByArtistProfile_User_Username(String username);

    Set<Education> findAllByArtistProfile_Id(Long id);
}
