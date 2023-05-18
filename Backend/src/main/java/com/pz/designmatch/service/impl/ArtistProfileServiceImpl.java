package com.pz.designmatch.service.impl;

import com.pz.designmatch.dto.request.ArtistFilterRequest;
import com.pz.designmatch.dto.request.ArtistProfileRequest;
import com.pz.designmatch.dto.response.ArtistProfileResponse;
import com.pz.designmatch.dto.response.ShortArtistProfileResponse;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.EducationRepository;
import com.pz.designmatch.repository.ExperienceRepository;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.ArtistProfileService;
import com.pz.designmatch.specification.ArtistProfileSpecification;
import com.pz.designmatch.util.mapper.ArtistProfileMapper;
import com.pz.designmatch.util.mapper.EducationMapper;
import com.pz.designmatch.util.mapper.ExperienceMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArtistProfileServiceImpl implements ArtistProfileService {

    private final ArtistProfileRepository artistProfileRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final UserRepository userRepository;
    private final ArtistProfileMapper artistProfileMapper;
    private final EducationMapper educationMapper;
    private final ExperienceMapper experienceMapper;

    @Autowired
    public ArtistProfileServiceImpl(ArtistProfileRepository artistProfileRepository, ExperienceRepository experienceRepository,
                                    EducationRepository educationRepository, UserRepository userRepository, ArtistProfileMapper artistProfileMapper,
                                    EducationMapper educationMapper, ExperienceMapper experienceMapper) {
        this.artistProfileRepository = artistProfileRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.userRepository = userRepository;
        this.artistProfileMapper = artistProfileMapper;
        this.educationMapper = educationMapper;
        this.experienceMapper = experienceMapper;
    }

    @Override
    public ArtistProfileResponse getArtistProfileByUsername(String username) {
        return artistProfileRepository.findByUser_Username(username)
                .map(artistProfileMapper::mapToDto)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono profilu artysty dla użytkownika: " + username));
    }

    @Override
    public ShortArtistProfileResponse getShortArtistProfileByUsername(String username) {
        return artistProfileRepository.findByUser_Username(username)
                .map(artistProfileMapper::mapToShortDto)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono profilu artysty dla użytkownika: " + username));
    }

    @Override
    @Transactional
    public ArtistProfileResponse updateArtistProfileByUsername(String username, ArtistProfileRequest artistProfile) {
        ArtistProfile existingArtistProfile = artistProfileRepository.findByUser_Username(username)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono profilu artysty dla użytkownika: " + username));

        Optional.ofNullable(artistProfile.getFirstname())
                .ifPresent(existingArtistProfile::setFirstname);
        Optional.ofNullable(artistProfile.getLastname())
                .ifPresent(existingArtistProfile::setLastname);
        Optional.ofNullable(artistProfile.getBio())
                .ifPresent(existingArtistProfile::setBio);
        Optional.ofNullable(artistProfile.getLevel())
                .map(Level::fromDisplayName)
                .ifPresent(existingArtistProfile::setLevel);
        Optional.ofNullable(artistProfile.getLocation())
                .map(City::fromDisplayName)
                .ifPresent(existingArtistProfile::setCity);
        Optional.ofNullable(artistProfile.getSkills())
                .map(skills -> skills.stream()
                        .map(Skill::fromDisplayName)
                        .collect(Collectors.toSet()))
                .ifPresent(existingArtistProfile::setSkills);
        Optional.ofNullable(artistProfile.getTags())
                .map(tags -> tags.stream()
                        .map(Tag::fromDisplayName)
                        .collect(Collectors.toSet()))
                .ifPresent(existingArtistProfile::setTags);
        Optional.ofNullable(artistProfile.getLanguages())
                .map(languages -> languages.stream()
                        .map(Language::fromDisplayName)
                        .collect(Collectors.toSet()))
                .ifPresent(existingArtistProfile::setLanguages);

        if (artistProfile.getEducation() != null) {
            educationRepository.deleteAllByArtistProfile_Id(existingArtistProfile.getId());
            educationRepository.saveAll(educationMapper.mapEducationDtoSetToEntitySet(artistProfile.getEducation(), existingArtistProfile));
        }

        if (artistProfile.getExperience() != null) {
            experienceRepository.deleteAllByArtistProfile_Id(existingArtistProfile.getId());
            experienceRepository.saveAll(experienceMapper.mapDtoSetToEntitySet(artistProfile.getExperience(), existingArtistProfile));
        }

        Optional.ofNullable(artistProfile.getWebsite())
                .ifPresent(existingArtistProfile::setWebsite);
        Optional.ofNullable(artistProfile.getFacebook())
                .ifPresent(existingArtistProfile::setFacebook);
        Optional.ofNullable(artistProfile.getLinkedin())
                .ifPresent(existingArtistProfile::setLinkedin);
        Optional.ofNullable(artistProfile.getInstagram())
                .ifPresent(existingArtistProfile::setInstagram);
        Optional.ofNullable(artistProfile.getDribble())
                .ifPresent(existingArtistProfile::setDribble);
        Optional.ofNullable(artistProfile.getPinterest())
                .ifPresent(existingArtistProfile::setPinterest);
        Optional.ofNullable(artistProfile.getTwitter())
                .ifPresent(existingArtistProfile::setTwitter);

        return artistProfileMapper.mapToDto(artistProfileRepository.save(existingArtistProfile));
    }

    @Override
    public Page<ShortArtistProfileResponse> filterArtistProfiles(ArtistFilterRequest filterRequest, Pageable pageable) {
        Specification<ArtistProfile> specification = Specification.where(null);

        if (filterRequest.getLevels() != null && !filterRequest.getLevels().isEmpty()) {
            List<Level> levelList = filterRequest.getLevels().stream()
                    .map(Level::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            specification = specification.and(ArtistProfileSpecification.hasLevel(levelList));
        }

        if (filterRequest.getLocations() != null && !filterRequest.getLocations().isEmpty()) {
            List<City> cityList = filterRequest.getLocations().stream()
                    .map(City::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            specification = specification.and(ArtistProfileSpecification.hasCity(cityList));
        }
        if (filterRequest.getSkills() != null && !filterRequest.getSkills().isEmpty()) {
            List<Skill> skillList = filterRequest.getSkills().stream()
                    .map(Skill::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            specification = specification.and(ArtistProfileSpecification.hasSkills(skillList));
        }
        if (filterRequest.getLanguages() != null && !filterRequest.getLanguages().isEmpty()) {
            List<Language> languageList = filterRequest.getLanguages().stream()
                    .map(Language::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            specification = specification.and(ArtistProfileSpecification.hasLanguage(languageList));
        }
        if (filterRequest.getTags() != null && !filterRequest.getTags().isEmpty()) {
            List<Tag> tagList = filterRequest.getTags().stream()
                    .map(Tag::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            specification = specification.and(ArtistProfileSpecification.hasTag(tagList));
        }

        Page<ArtistProfile> artistProfilePage = artistProfileRepository.findAll(specification, pageable);
        return artistProfilePage.map(artistProfileMapper::mapToShortDto);
    }
}
