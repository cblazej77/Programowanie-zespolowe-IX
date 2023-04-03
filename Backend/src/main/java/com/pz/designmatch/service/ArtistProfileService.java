package com.pz.designmatch.service;

import com.pz.designmatch.dto.ArtistProfileDto;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.CommissionRepository;
import com.pz.designmatch.repository.EducationRepository;
import com.pz.designmatch.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArtistProfileService {
    private final ArtistProfileRepository artistProfileRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CommissionRepository commissionRepository;

    @Autowired
    public ArtistProfileService(ArtistProfileRepository artistProfileRepository, ExperienceRepository experienceRepository, EducationRepository educationRepository, CommissionRepository commissionRepository) {
        this.artistProfileRepository = artistProfileRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.commissionRepository = commissionRepository;
    }

    public ArtistProfile updateArtistProfile(String username, ArtistProfileDto artistProfileDto) {
        Optional<ArtistProfile> optionalArtistProfile = artistProfileRepository.findByUser_Username(username);
        if (optionalArtistProfile.isPresent()) {
            ArtistProfile existingArtistProfile = optionalArtistProfile.get();
            existingArtistProfile.setBio(artistProfileDto.getBio());
            existingArtistProfile.setLevel(Level.fromDisplayName(artistProfileDto.getLevel()));
            existingArtistProfile.setLocation(artistProfileDto.getLocation().stream()
                    .map(City::fromDisplayName)
                    .collect(Collectors.toSet()));
            existingArtistProfile.setSkills(artistProfileDto.getSkills().stream()
                    .map(Subcategory::fromDisplayName)
                    .collect(Collectors.toSet()));
            existingArtistProfile.setTags(artistProfileDto.getTags().stream()
                    .map(Tag::fromDisplayName)
                    .collect(Collectors.toSet()));
            existingArtistProfile.setLanguages(artistProfileDto.getLanguages().stream()
                    .map(Language::fromDisplayName)
                    .collect(Collectors.toSet()));
            existingArtistProfile.setWebsite(artistProfileDto.getWebsite());
            existingArtistProfile.setFacebook(artistProfileDto.getFacebook());
            existingArtistProfile.setLinkedin(artistProfileDto.getLinkedin());
            existingArtistProfile.setInstagram(artistProfileDto.getInstagram());
            existingArtistProfile.setDribble(artistProfileDto.getDribble());
            existingArtistProfile.setPinterest(artistProfileDto.getPinterest());
            existingArtistProfile.setTwitter(artistProfileDto.getTwitter());
            return artistProfileRepository.save(existingArtistProfile);
        }
        return null; // handle error scenario if required
    }

    public ArtistProfile getArtistProfile(String username) {
        Optional<ArtistProfile> optionalArtistProfile = artistProfileRepository.findByUser_Username(username);
        if (optionalArtistProfile.isPresent()) {
            return optionalArtistProfile.get();
        }
        return null; // handle error scenario if required
    }


}
