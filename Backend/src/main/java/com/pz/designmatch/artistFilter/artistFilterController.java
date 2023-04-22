package com.pz.designmatch.artistFilter;

import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.repository.ArtistProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/artist")
public class artistFilterController {
    @Autowired
    private ArtistProfileRepository artistProfileRepository;

    @GetMapping("/filter")
    public List<ArtistProfile> filterArtists(@RequestParam(name = "level", required = false) List<Level> level,
                                             @RequestParam(name = "location", required = false) List<City> city,
                                             @RequestParam(name = "category", required = false) List<Category> category,
                                             @RequestParam(name = "language", required = false) List<Language> languages,
                                             @RequestParam(name = "subcategory", required = false) List<Subcategory> subcategory,
                                             @RequestParam(name = "tags", required = false) List<Tag> tags) {
        Specification<ArtistProfile> specification = Specification.where(null);
        if (level != null && !level.isEmpty()) {
            specification = specification.and(ArtistProfileSpecification.hasLevel(level));
        }
        if (city != null && !city.isEmpty()){
            specification = specification.and(ArtistProfileSpecification.hasCity(city));
        }
        if(category != null && !category.isEmpty()){
            List<Subcategory> subcategoryList = category.stream()
                    .flatMap(c -> Arrays.stream(Subcategory.values())
                            .filter(s -> s.getCategory() == c))
                    .collect(Collectors.toList());
            specification = specification.and(ArtistProfileSpecification.hasSkills(subcategoryList));
        }
        if (languages != null && !languages.isEmpty()) {
            specification = specification.and(ArtistProfileSpecification.hasLanguage(languages));
        }
        if (subcategory != null && !subcategory.isEmpty()) {
            specification = specification.and(ArtistProfileSpecification.hasSkills(subcategory));
        }
        if (tags != null && !tags.isEmpty()) {
            specification = specification.and(ArtistProfileSpecification.hasTag(tags));
        }
        return artistProfileRepository.findAll(specification);

    }
}



