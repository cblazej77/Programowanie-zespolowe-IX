package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {

    Set<Education> findAllByArtistProfile_User_Username(String username);

    Set<Education> findAllByArtistProfile_Id(Long id);

    void deleteAllByArtistProfile_Id(Long artistProfileId);
}
