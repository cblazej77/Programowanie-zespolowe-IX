package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Experience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    Set<Experience> findAllByArtistProfile_User_Username(String username);

    Set<Experience> findAllByArtistProfile_Id(Long id);

    void deleteAllByArtistProfile_Id(Long artistProfileId);
}
