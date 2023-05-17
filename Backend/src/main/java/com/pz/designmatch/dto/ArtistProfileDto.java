package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ArtistProfileDto {

    @JsonProperty("bio")
    private final String bio;

    @JsonProperty("level")
    private final String level;

    @JsonProperty("location")
    private final String location;

    @JsonProperty("skills")
    private final Set<String> skills;

    @JsonProperty("tags")
    private final Set<String> tags;

    @JsonProperty("languages")
    private final Set<String> languages;

    @JsonProperty("education")
    private final Set<EducationDto> education;

    @JsonProperty("experience")
    private final Set<ExperienceDto> experience;

    @JsonProperty("website")
    private final String website;

    @JsonProperty("facebook")
    private final String facebook;

    @JsonProperty("linkedin")
    private final String linkedin;

    @JsonProperty("instagram")
    private final String instagram;

    @JsonProperty("dribble")
    private final String dribble;

    @JsonProperty("pinterest")
    private final String pinterest;

    @JsonProperty("twitter")
    private final String twitter;


    @JsonCreator
    public ArtistProfileDto(String bio, String level, String location, Set<String> skills, Set<String> tags,
                            Set<String> languages, Set<EducationDto> education, Set<ExperienceDto> experience,
                            String website, String facebook, String linkedin, String instagram, String dribble,
                            String pinterest, String twitter) {
        this.bio = bio;
        this.level = level;
        this.location = location;
        this.skills = skills;
        this.tags = tags;
        this.languages = languages;
        this.education = education;
        this.experience = experience;
        this.website = website;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.instagram = instagram;
        this.dribble = dribble;
        this.pinterest = pinterest;
        this.twitter = twitter;
    }
}
