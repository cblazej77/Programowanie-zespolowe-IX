package com.pz.designmatch.service;

import com.pz.designmatch.dto.ArtistProfileDto;
import com.pz.designmatch.dto.EducationDto;
import com.pz.designmatch.dto.ExperienceDto;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.Education;
import com.pz.designmatch.model.user.Experience;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.CommissionRepository;
import com.pz.designmatch.repository.EducationRepository;
import com.pz.designmatch.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ArtistProfileService {
    private final ArtistProfileRepository artistProfileRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;

    @Autowired
    public ArtistProfileService(ArtistProfileRepository artistProfileRepository, ExperienceRepository experienceRepository, EducationRepository educationRepository, CommissionRepository commissionRepository) {
        this.artistProfileRepository = artistProfileRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
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

    public ArtistProfileDto getArtistProfileDto(String username) {
        Optional<ArtistProfile> optionalArtistProfile = artistProfileRepository.findByUser_Username(username);
        if (optionalArtistProfile.isPresent()) {
            ArtistProfile artistProfile = optionalArtistProfile.get();
            return mapToDto(artistProfile);
        }
        return null; // handle error scenario if required
    }

    private ArtistProfileDto mapToDto(ArtistProfile artistProfile) {
        if (artistProfile == null)
            return null;
        return new ArtistProfileDto(
                artistProfile.getBio(),
                artistProfile.getLevel().getDisplayName(),
                artistProfile.getLocation().stream()
                    .map(City::getDisplayName)
                    .collect(Collectors.toSet()),
                artistProfile.getSkills().stream()
                    .map(Subcategory::getDisplayName)
                    .collect(Collectors.toSet()),
                artistProfile.getTags().stream()
                    .map(Tag::getDisplayName)
                    .collect(Collectors.toSet()),
                artistProfile.getLanguages().stream()
                    .map(Language::getDisplayName)
                    .collect(Collectors.toSet()),
                mapEducationSetToDtoSet(educationRepository.findAllByArtistProfile_Id(artistProfile.getId()).orElse(null)),
                mapExperienceSetToDtoSet(experienceRepository.findAllByArtistProfile_Id(artistProfile.getId()).orElse(null)),
                artistProfile.getWebsite(),
                artistProfile.getFacebook(),
                artistProfile.getLinkedin(),
                artistProfile.getInstagram(),
                artistProfile.getDribble(),
                artistProfile.getPinterest(),
                artistProfile.getTwitter());
    }

    private Set<EducationDto> mapEducationSetToDtoSet(Set<Education> educationSet) {
        if (educationSet == null) {
            return null;
        }
        return educationSet.stream()
                .map(education -> new EducationDto(
                        education.getSchoolName(),
                        education.getFaculty(),
                        education.getFieldOfStudy(),
                        education.getDegree(),
                        education.getStartDate(),
                        education.getEndDate(),
                        education.getDescription()))
                .collect(Collectors.toSet());
    }

    private Set<ExperienceDto> mapExperienceSetToDtoSet(Set<Experience> experienceSet) {
        if (experienceSet == null) {
            return null;
        }
        return experienceSet.stream()
                .map(experience -> new ExperienceDto(
                        experience.getCompany(),
                        experience.getCity(),
                        experience.getPosition(),
                        experience.getStartDate(),
                        experience.getEndDate(),
                        experience.getDescription()))
                .collect(Collectors.toSet());
    }
}
