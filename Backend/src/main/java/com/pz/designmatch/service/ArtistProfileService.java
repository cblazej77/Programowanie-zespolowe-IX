package com.pz.designmatch.service;

import com.pz.designmatch.dto.ArtistProfileDto;
import com.pz.designmatch.dto.EducationDto;
import com.pz.designmatch.dto.ExperienceDto;
import com.pz.designmatch.dto.response.ShortProfileDto;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.Education;
import com.pz.designmatch.model.user.Experience;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.EducationRepository;
import com.pz.designmatch.repository.ExperienceRepository;
import com.pz.designmatch.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ArtistProfileService {
    private final ArtistProfileRepository artistProfileRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final UserRepository userRepository;

    @Autowired
    public ArtistProfileService(ArtistProfileRepository artistProfileRepository, ExperienceRepository experienceRepository, EducationRepository educationRepository,
                                UserRepository userRepository) {
        this.artistProfileRepository = artistProfileRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ArtistProfileDto updateArtistProfileByUsername(String username, ArtistProfileDto artistProfileDto) {
//        Optional<ArtistProfile> optionalArtistProfile = artistProfileRepository.findByUser_Username(username);
//        ArtistProfile existingArtistProfile = new ArtistProfile();
//        if (userRepository.findByUsername(username)) {
//            if (userRepository.existsByUsername(username)) {
//                existingArtistProfile.setUser(userRepository.findByUsername(username).get());
//            } else {
//                throw new RuntimeException("Artist profile not found for username: " + username);
//            }
//            throw new RuntimeException("Artist profile not found for username: " + username);
//        }
//        else
//            existingArtistProfile = artistProfileRepository.findByUser_Username(username).get();
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if (user.isEmpty())
            throw new RuntimeException("This user doesn't exist: " + username);
        Optional<ArtistProfile> optionalArtistProfile = artistProfileRepository.findByUser_Username(username);
        if (optionalArtistProfile.isEmpty()){
            ArtistProfile newArtistProfile = new ArtistProfile();
            newArtistProfile.setUser(user.get());
            artistProfileRepository.save(newArtistProfile);
            optionalArtistProfile = artistProfileRepository.findByUser_Username(username);
        }
        ArtistProfile existingArtistProfile = optionalArtistProfile.get();

        if (artistProfileDto.getBio() != null)
            existingArtistProfile.setBio(artistProfileDto.getBio());

        if (artistProfileDto.getLevel() != null)
            existingArtistProfile.setLevel(Level.fromDisplayName(artistProfileDto.getLevel()));

        if (artistProfileDto.getLocation() != null)
            existingArtistProfile.setLocation(City.fromDisplayName(artistProfileDto.getLocation()));

        if (artistProfileDto.getSkills() != null)
            existingArtistProfile.setSkills(artistProfileDto.getSkills().stream()
                    .map(Subcategory::fromDisplayName)
                    .collect(Collectors.toSet()));

        if (artistProfileDto.getTags() != null)
            existingArtistProfile.setTags(artistProfileDto.getTags().stream()
                    .map(Tag::fromDisplayName)
                    .collect(Collectors.toSet()));

        if (artistProfileDto.getLanguages() != null)
            existingArtistProfile.setLanguages(artistProfileDto.getLanguages().stream()
                    .map(Language::fromDisplayName)
                    .collect(Collectors.toSet()));

        if (artistProfileDto.getEducation() != null) {
            //Set<Education> educationSet = educationRepository.findAllByArtistProfile_Id(existingArtistProfile.getId());
            //educationSet.clear();
            educationRepository.deleteAllByArtistProfile_Id(existingArtistProfile.getId());
            educationRepository.saveAll(mapEducationDtoSetToEducationEntitySet(artistProfileDto.getEducation(), existingArtistProfile));
        }

        if (artistProfileDto.getExperience() != null) {
            //Set<Experience> experienceSet = experienceRepository.findAllByArtistProfile_Id(existingArtistProfile.getId());
            //experienceSet.clear();
            experienceRepository.deleteAllByArtistProfile_Id(existingArtistProfile.getId());
            experienceRepository.saveAll(mapExperienceDtoSetToExperienceEntitySet(artistProfileDto.getExperience(), existingArtistProfile));
        }

        if (artistProfileDto.getWebsite() != null)
            existingArtistProfile.setWebsite(artistProfileDto.getWebsite());

        if (artistProfileDto.getFacebook() != null)
            existingArtistProfile.setFacebook(artistProfileDto.getFacebook());

        if (artistProfileDto.getLinkedin() != null)
            existingArtistProfile.setLinkedin(artistProfileDto.getLinkedin());

        if (artistProfileDto.getInstagram() != null)
            existingArtistProfile.setInstagram(artistProfileDto.getInstagram());

        if (artistProfileDto.getDribble() != null)
            existingArtistProfile.setDribble(artistProfileDto.getDribble());

        if (artistProfileDto.getPinterest() != null)
            existingArtistProfile.setPinterest(artistProfileDto.getPinterest());

        if (artistProfileDto.getTwitter() != null)
            existingArtistProfile.setTwitter(artistProfileDto.getTwitter());

        return mapToDto(artistProfileRepository.save(existingArtistProfile));
    }

    public ArtistProfile getArtistProfileEntityByUsername(String username) {
        return artistProfileRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Artist profile not found for username: " + username));
    }

    public ShortProfileDto getShortArtistProfileDtoByUsername(String username) {
        return artistProfileRepository.findByUser_Username(username)
                .map(this::mapToShortDto)
                .orElseThrow(() -> new RuntimeException("Artist profile not found for username: " + username));
    }

    public ArtistProfileDto getArtistProfileDtoByUsername(String username) {
        return artistProfileRepository.findByUser_Username(username)
                .map(this::mapToDto)
                .orElseThrow(() -> new RuntimeException("Artist profile not found for username: " + username));
    }

    private ArtistProfileDto mapToDto(ArtistProfile artistProfile) {
        if (artistProfile == null)
            return null;
        return new ArtistProfileDto(
                artistProfile.getBio(),
                artistProfile.getLevel() != null ? artistProfile.getLevel().getDisplayName() : null,
                artistProfile.getLocation() != null ? artistProfile.getLocation().getDisplayName() : null,
                artistProfile.getSkills().stream()
                        .map(Subcategory::getDisplayName)
                        .collect(Collectors.toSet()),
                artistProfile.getTags().stream()
                        .map(Tag::getDisplayName)
                        .collect(Collectors.toSet()),
                artistProfile.getLanguages().stream()
                        .map(Language::getDisplayName)
                        .collect(Collectors.toSet()),
                mapEducationEntitySetToEducationDtoSet(educationRepository.findAllByArtistProfile_Id(artistProfile.getId())),
                mapExperienceEntitySetToExperienceDtoSet(experienceRepository.findAllByArtistProfile_Id(artistProfile.getId())),
                artistProfile.getWebsite(),
                artistProfile.getFacebook(),
                artistProfile.getLinkedin(),
                artistProfile.getInstagram(),
                artistProfile.getDribble(),
                artistProfile.getPinterest(),
                artistProfile.getTwitter());
    }

    private Set<EducationDto> mapEducationEntitySetToEducationDtoSet(Set<Education> educationSet) {
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

    private Set<Education> mapEducationDtoSetToEducationEntitySet(Set<EducationDto> educationDtoSet, ArtistProfile artistProfile) {
        if (educationDtoSet == null) {
            return null;
        }
        return educationDtoSet.stream()
                .map(educationDto -> new Education(
                        artistProfile,
                        educationDto.getSchoolName(),
                        educationDto.getFaculty(),
                        educationDto.getFieldOfStudy(),
                        educationDto.getDegree(),
                        educationDto.getStartDate(),
                        educationDto.getEndDate(),
                        educationDto.getDescription()))
                .collect(Collectors.toSet());
    }

    private Set<ExperienceDto> mapExperienceEntitySetToExperienceDtoSet(Set<Experience> experienceSet) {
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

    private Set<Experience> mapExperienceDtoSetToExperienceEntitySet(Set<ExperienceDto> experienceDtoSet, ArtistProfile artistProfile) {
        if (experienceDtoSet == null) {
            return null;
        }
        return experienceDtoSet.stream()
                .map(experienceDto -> new Experience(
                        artistProfile,
                        experienceDto.getCompany(),
                        experienceDto.getCity(),
                        experienceDto.getPosition(),
                        experienceDto.getStartDate(),
                        experienceDto.getEndDate(),
                        experienceDto.getDescription()))
                .collect(Collectors.toSet());
    }

    private String serializeYearMonth(YearMonth yearMonth) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-yyyy");
        return yearMonth.format(formatter);
    }

    private YearMonth deserializeYearMonth(String yearMonth) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-yyyy");
        return YearMonth.parse(yearMonth, formatter);
    }

    private ShortProfileDto mapToShortDto(ArtistProfile artistProfile) {
        if (artistProfile == null)
            return null;
        return new ShortProfileDto(
                artistProfile.getUser().getFirstname(),
                artistProfile.getUser().getLastname(),
                artistProfile.getLocation() != null ? artistProfile.getLocation().getDisplayName() : null,
                artistProfile.getLevel() != null ? artistProfile.getLevel().getDisplayName() : null,
                artistProfile.getSkills().stream()
                        .limit(2)
                        .map(Subcategory::getDisplayName)
                        .collect(Collectors.toSet())
        );
    }
}
