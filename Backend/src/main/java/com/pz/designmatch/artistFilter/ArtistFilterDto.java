package com.pz.designmatch.artistFilter;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArtistFilterDto {
    @JsonProperty("level")
    private final Set<String> level;

    @JsonProperty("location")
    private final Set<String> city;

    @JsonProperty("skills")
    private final Set<String> skills;
    @JsonProperty("languages")
    private final Set<String> languages;

    @JsonProperty("tags")
    private final Set<String> tags;

    @JsonCreator
    public ArtistFilterDto(Set<String> level, Set<String> city, Set<String> skills, Set<String> languages, Set<String> tags) {
        this.level = level;
        this.city = city;
        this.skills = skills;
        this.languages = languages;
        this.tags = tags;
    }

    @JsonGetter("level")
    public Set<String> getLevel() {
        return level;
    }

    @JsonGetter("location")
    public Set<String> getCity() {
        return city;
    }

    @JsonGetter("skills")
    public Set<String> getSkills() {
        return skills;
    }

    @JsonGetter("languages")
    public Set<String> getLanguages() {
        return languages;
    }

    @JsonGetter("tags")
    public Set<String> getTags() {
        return tags;
    }
}
