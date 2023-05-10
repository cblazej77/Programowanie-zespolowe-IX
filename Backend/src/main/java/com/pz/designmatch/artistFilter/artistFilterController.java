package com.pz.designmatch.artistFilter;

import com.pz.designmatch.dto.response.ShortProfileDto;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.service.ArtistProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/artist")
public class artistFilterController {
    public static final String apiVersionAccept = "application/json";
    @Autowired
    private ArtistProfileRepository artistProfileRepository;

    @PostMapping(value = "/filter", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<ShortProfileDto>> filterArtists(@RequestBody ArtistFilterDto request,
                                                               @RequestParam(defaultValue = "0", name = "page") int page,
                                                               @RequestParam(defaultValue = "10", name = "size") int size) {
        Specification<ArtistProfile> specification = Specification.where(null);
        if (request.getLevel() != null && !request.getLevel().isEmpty()) {
            List<Level> levelList = new ArrayList<>();
            for (String level : request.getLevel()) {
                Level level1 = Level.fromDisplayName(level);
                if (level1 != null) {
                    levelList.add(level1);
                } else {
                    System.out.println("Error value: " + level);
                }
            }
            specification = specification.or(ArtistProfileSpecification.hasLevel(levelList));
        }
        if (request.getCity() != null && !request.getCity().isEmpty()) {
            List<City> cityList = new ArrayList<>();
            for (String city : request.getCity()) {
                City city1 = City.fromDisplayName(city);
                if (city1 != null) {
                    cityList.add(city1);
                } else {
                    System.out.println("Error value: " + city);
                }
            }
            specification = specification.or(ArtistProfileSpecification.hasCity(cityList));
        }
        if (request.getSkills() != null && !request.getSkills().isEmpty()) {
            List<Subcategory> subcategoryList = new ArrayList<>();
            for (String skill : request.getSkills()) {
                Subcategory subcategory = Subcategory.fromDisplayName(skill);
                if (subcategory != null) {
                    subcategoryList.add(subcategory);
                } else {
                    System.out.println("Error value: " + skill);
                }
            }
            specification = specification.or(ArtistProfileSpecification.hasSkills(subcategoryList));
        }
        if (request.getLanguages() != null && !request.getLanguages().isEmpty()) {
            List<Language> languageList = new ArrayList<>();
            for (String language : request.getLanguages()) {
                Language lang = Language.fromDisplayName(language);
                if (lang != null) {
                    languageList.add(lang);
                } else {
                    System.out.println("Error value: " + language);
                }
            }
            specification = specification.or(ArtistProfileSpecification.hasLanguage(languageList));
        }
        if (request.getTags() != null && !request.getTags().isEmpty()) {
            List<Tag> tagList = new ArrayList<>();
            for (String tag : request.getTags()) {
                Tag tag1 = Tag.fromDisplayName(tag);
                if (tag1 != null) {
                    tagList.add(tag1);
                } else {
                    System.out.println("Error value: " + tag);
                }
            }
            specification = specification.or(ArtistProfileSpecification.hasTag(tagList));
        }
        Pageable paging = PageRequest.of(page, size);
        Page<ArtistProfile> artistProfilePage = artistProfileRepository.findAll(specification, paging);
        Page<ShortProfileDto> shortProfileDtos = artistProfilePage.map(ArtistProfileService::mapToShortDto);
        //Page<ArtistFilterDto> artistFilterDtos = artistProfilePage.map(ArtistProfileService::mapToArtistDto);
//        Page<ArtistFilterDto> artistFilterDtos = artistProfilePage.map(ap -> new ArtistFilterDto(
//                Stream.of(ap.getLevel().toString()).collect(Collectors.toSet()),
//                Stream.of(ap.getLocation().toString()).collect(Collectors.toSet()),
//                ap.getSkills().stream().map(Subcategory::toString).collect(Collectors.toSet()),
//                ap.getLanguages().stream().map(Language::toString).collect(Collectors.toSet()),
//                ap.getTags().stream().map(Tag::toString).collect(Collectors.toSet())
//        ));
        //Page<ArtistFilterDto> artistFilterDtos = artistProfilePage.map(ArtistProfileService::mapToShortDto);
        return ResponseEntity.ok(artistFilterDtos);
    }
}

