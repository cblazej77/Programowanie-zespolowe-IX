package com.pz.designmatch.artistFilter;

import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.ArtistProfile;
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
    public static Specification<ArtistProfile> hasLanguage(List<Language> language){
        return (root, query, builder) -> { return root.get("language").in(language);
        };
    }
    public static Specification<ArtistProfile> hasSubcategory(List<Subcategory> subcategory) {
        return (root, query, builder) -> { return root.get("subcategory").in(subcategory);
        };
    }
    public static Specification<ArtistProfile> hasTag(List<Tag> tag){
        return (root, query, builder) -> { return root.get("tag").in(tag);
        };
    }
}