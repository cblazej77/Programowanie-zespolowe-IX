package com.pz.designmatch.comissions;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class commissionFilterDto {
    @JsonProperty("level")
    private final Set<String> level;
    @JsonProperty("location")
    private final Set<String> location;
    @JsonProperty("skills")
    private final Set<String> skills;
    @JsonProperty("tags")
    private final Set<String> tags;
    @JsonProperty("languages")
    private final Set<String> languages;

    @JsonCreator

    public commissionFilterDto(Set<String> level, Set<String> location, Set<String> skills, Set<String> tags, Set<String> languages) {
        this.level = level;
        this.location = location;
        this.skills = skills;
        this.tags = tags;
        this.languages = languages;
    }
    @JsonGetter("level")
    public Set<String> getLevel() {
        return level;
    }
    @JsonGetter("location")
    public Set<String> getLocation() {
        return location;
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
