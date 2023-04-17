package com.pz.designmatch.util;

import com.pz.designmatch.model.enums.Role;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ArtistProfileRepository;
import jakarta.persistence.PrePersist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserEntityListener {
    private final ArtistProfileRepository artistProfileRepository;

    @Autowired
    public UserEntityListener(ArtistProfileRepository artistProfileRepository) {
        this.artistProfileRepository = artistProfileRepository;
    }

    @PrePersist
    public void onUserCreate(UserEntity user) {
        if (user.getRole() == Role.ARTIST) {
            ArtistProfile userProfile = new ArtistProfile();
            userProfile.setUser(user);
            artistProfileRepository.save(userProfile);
        }
    }
}
