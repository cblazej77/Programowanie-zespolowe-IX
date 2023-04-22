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

import java.util.List;

@RestController
@RequestMapping("/artist")
public class artistFilterController {
    @Autowired
    private ArtistProfileRepository artistProfileRepository;

    @GetMapping("/filter")
    public List<ArtistProfile> filterArtists(@RequestParam(name = "level") List<Level> level,
                                             @RequestParam(name = "location") List<City> city,
                                             @RequestParam(name = "category") List<Category> category,
                                             @RequestParam(name = "language") List<Language> language,
                                             @RequestParam(name = "subcategory") List<Subcategory> subcategory,
                                             @RequestParam(name = "tags") List<Tag> tag) {
        Specification<ArtistProfile> specification = Specification.where(null);
        if (level != null && !level.isEmpty()) {
            specification = specification.or(ArtistProfileSpecification.hasLevel(level));
        }
        if (city != null && !city.isEmpty()) {
            specification = specification.or(ArtistProfileSpecification.hasCity(city));
        }
        if (category != null && !category.isEmpty()) {
            specification = specification.or(ArtistProfileSpecification.hasCategory(category));
        }
        if (language != null && !language.isEmpty()) {
            specification = specification.or(ArtistProfileSpecification.hasLanguage(language));
        }
        if (subcategory != null && !subcategory.isEmpty()) {
            specification = specification.or(ArtistProfileSpecification.hasSubcategory(subcategory));
        }
        if (tag != null && !tag.isEmpty()) {
            specification = specification.or(ArtistProfileSpecification.hasTag(tag));
        }
        return artistProfileRepository.findAll(specification);

    }
}