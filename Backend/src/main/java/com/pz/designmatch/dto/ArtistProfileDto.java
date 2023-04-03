package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pz.designmatch.dto.response.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
public class ArtistProfileDto {
    private final String bio;
    private final String level;
    private final Set<String> location;
    private final Set<String> skills;
    private final Set<String> tags;
    private final Set<String> languages;
    private final Set<EducationDto> education;
    private final Set<ExperienceDto> experience;
    private final String website;
    private final String facebook;
    private final String linkedin;
    private final String instagram;
    private final String dribble;
    private final String pinterest;
    private final String twitter;

    @JsonCreator
    public ArtistProfileDto(@JsonProperty("bio") String bio,
                            @JsonProperty("level") String level,
                            @JsonProperty("location") Set<String> location,
                            @JsonProperty("skills") Set<String> skills,
                            @JsonProperty("tags") Set<String> tags,
                            @JsonProperty("languages") Set<String> languages,
                            @JsonProperty("education") Set<EducationDto> education,
                            @JsonProperty("experience") Set<ExperienceDto> experience,
                            @JsonProperty("website") String website,
                            @JsonProperty("facebook") String facebook,
                            @JsonProperty("linkedin") String linkedin,
                            @JsonProperty("instagram") String instagram,
                            @JsonProperty("dribble") String dribble,
                            @JsonProperty("pinterest") String pinterest,
                            @JsonProperty("twitter") String twitter) {
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
