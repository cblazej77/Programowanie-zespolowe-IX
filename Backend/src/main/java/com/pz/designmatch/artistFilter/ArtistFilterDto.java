package com.pz.designmatch.artistFilter;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArtistFilterDto {

    @JsonProperty("level")
    private final String level;

    @JsonProperty("location")
    private final String city;

    @JsonProperty("skills")
    private final Set<String> skills;
    @JsonProperty("languages")
    private final Set<String> languages;

    @JsonProperty("tags")
    private final Set<String> tags;

    public ArtistFilterDto(String level, String city, Set<String> skills, Set<String> languages, Set<String> tags) {
        this.level = level;
        this.city = city;
        this.skills = skills;
        this.languages = languages;
        this.tags = tags;
    }
}
