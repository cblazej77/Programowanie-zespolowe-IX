package com.pz.designmatch.repository;

import com.pz.designmatch.model.user.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    Set<Experience> findAllByArtistProfile_User_Username(String username);

    Set<Experience> findAllByArtistProfile_Id(Long id);
}
