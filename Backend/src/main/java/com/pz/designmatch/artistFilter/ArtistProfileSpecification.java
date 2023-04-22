package com.pz.designmatch.artistFilter;

import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class ArtistProfileSpecification {
    public static Specification<ArtistProfile> hasLevel(List<Level> level) {
        return(root, query, builder) -> { return root.get("level").in(level);
        };
    }
    public static Specification<ArtistProfile> hasCategory(List<Category> category) {
        return (root, query, builder) -> { return root.get("category").in(category);
        };
    }
    public static Specification<ArtistProfile> hasCity(List<City> city) {
        return (root, query, builder) -> { return root.get("location").in(city);
        };
    }
    public static Specification<ArtistProfile> hasLanguage(List<Language> languages){
        return (root, query, builder) -> { Join<ArtistProfile, Language> join = root.join("languages");
            return join.in(languages);
        };
    }
    public static Specification<ArtistProfile> hasSkills(List<Subcategory> skill) {
        return (root, query, criteriaBuilder) -> { Join<ArtistProfile, Subcategory> join = root.join("skills");
            return join.in(skill);
        };
    }
    public static Specification<ArtistProfile> hasTag(List<Tag> tags){
        return (root, query, builder) -> { Join<ArtistProfile, Tag> join = root.join("tags");
            return join.in(tags);
        };
    }
}
