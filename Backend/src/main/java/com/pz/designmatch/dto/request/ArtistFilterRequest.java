package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArtistFilterRequest {

    @JsonProperty("levels")
    private final Set<String> levels;

    @JsonProperty("locations")
    private final Set<String> locations;

    @JsonProperty("skills")
    private final Set<String> skills;

    @JsonProperty("languages")
    private final Set<String> languages;

    @JsonProperty("tags")
    private final Set<String> tags;

    @JsonCreator
    public ArtistFilterRequest(Set<String> levels, Set<String> locations, Set<String> skills, Set<String> languages, Set<String> tags) {
        this.levels = levels;
        this.locations = locations;
        this.skills = skills;
        this.languages = languages;
        this.tags = tags;
    }
}
