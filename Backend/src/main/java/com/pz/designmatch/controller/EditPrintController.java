package com.pz.designmatch.controller;


import com.pz.designmatch.dto.request.EditingAndPrintDto;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.Education;
import com.pz.designmatch.model.user.Experience;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.EducationRepository;
import com.pz.designmatch.repository.ExperienceRepository;
import com.pz.designmatch.service.EditService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/EditingAndPrint/")
public class EditPrintController {
    @Autowired
    private final ArtistProfileRepository artistProfileRepository;
    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;
    private EditService editService;

    public EditPrintController(ArtistProfileRepository artistProfileRepository,
                               EducationRepository educationRepository,
                               ExperienceRepository experienceRepository) {
        this.artistProfileRepository = artistProfileRepository;
        this.educationRepository = educationRepository;
        this.experienceRepository = experienceRepository;
    }

    @PostMapping("edit")
    public ResponseEntity<ArtistProfile> edit(@Valid @RequestBody EditingAndPrintDto editdto){
        Set<City> validLocations = new HashSet<>();
        for(City cityEnum : editdto.getLocation()){
            City city = City.valueOf(String.valueOf(cityEnum));
            validLocations.add(city);
        }
        Set<Language> validLanguage = new HashSet<>();
        for(Language languageEnum : editdto.getLanguages()){
            Language language = Language.valueOf(String.valueOf(languageEnum));
            validLanguage.add(language);
        }
        Set<Level> validLevel = new HashSet<>();
        for(Level levelEnum : editdto.getLevel()){
            Level level = Level.valueOf(String.valueOf(levelEnum));
            validLevel.add(level);
        }
        Set<Subcategory> validSubcategory = new HashSet<>();
        for(Subcategory subcategoryEnum : editdto.getSkills()){
            Subcategory subcategory = Subcategory.valueOf(String.valueOf(subcategoryEnum));
            validSubcategory.add(subcategory);
        }
        Set<Tag> validTag = new HashSet<>();
        for(Tag tagEnum : editdto.getTags()){
            Tag tag = Tag.valueOf(String.valueOf(tagEnum));
            validTag.add(tag);
        }
        editdto.setLocation(validLocations);
        editdto.setLanguages(validLanguage);
        editdto.setLevel(validLevel);
        editdto.setSkills(validSubcategory);
        editdto.setTags(validTag);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ArtistProfile artistProfile = (ArtistProfile) authentication.getPrincipal();
        Education education = (Education) authentication.getPrincipal();
        Experience experience = (Experience) authentication.getPrincipal();
        //artistProfile.setLevel(editdto.getLevel());
        artistProfile.setLanguages(editdto.getLanguages());
        artistProfile.setSkills(editdto.getSkills());
        artistProfile.setLocation(editdto.getLocation());
        artistProfile.setTags(editdto.getTags());
        education.setArtistProfile(education.getArtistProfile());
        education.setSchoolName(education.getSchoolName());
        education.setFaculty(education.getFaculty());
        education.setFieldOfStudy(education.getFieldOfStudy());
        education.setDegree(education.getDegree());
        education.setStartDate(education.getStartDate());
        education.setEndDate(education.getEndDate());
        education.setDescription(education.getDescription());
        experience.setArtistProfile(education.getArtistProfile());
        experience.setCompany(experience.getCompany());
        experience.setCity(experience.getCity());
        experience.setPosition(experience.getPosition());
        experience.setStartDate(experience.getStartDate());
        experience.setEndDate(experience.getEndDate());
        experience.setDescription(experience.getDescription());
        artistProfileRepository.save(artistProfile);
        educationRepository.save(education);
        experienceRepository.save(experience);
        ArtistProfile artistProfileUpdated = editService.editUser(editdto);
        return ResponseEntity.ok(artistProfileUpdated);
        //return new ResponseEntity<>("Profil uzytkownika zostal zmieniony", HttpStatus.OK);
    }

    @GetMapping("print")
    public ResponseEntity<EditingAndPrintDto> getArtistProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        ArtistProfile artistProfile = (ArtistProfile) authentication.getPrincipal();
        EditingAndPrintDto editingAndPrintDto = new EditingAndPrintDto();
        editingAndPrintDto.setUsername(editingAndPrintDto.getUsername());
        editingAndPrintDto.setEducation(editingAndPrintDto.getEducation());
        editingAndPrintDto.setExperiences(editingAndPrintDto.getExperiences());
        editingAndPrintDto.setLanguages(editingAndPrintDto.getLanguages());
        editingAndPrintDto.setLevel(editingAndPrintDto.getLevel());
        editingAndPrintDto.setLocation(editingAndPrintDto.getLocation());
        editingAndPrintDto.setSkills(editingAndPrintDto.getSkills());
        editingAndPrintDto.setTags(editingAndPrintDto.getTags());
        return new ResponseEntity<>(editingAndPrintDto, HttpStatus.OK);
    }


}
