package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pz.designmatch.dto.EducationDto;
import com.pz.designmatch.dto.ExperienceDto;
import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

@SuppressWarnings({"unused"})
public class ArtistProfileResponse {

    @NotEmpty
    @JsonProperty("id")
    private final Long id;

    @NotEmpty
    @JsonProperty("username")
    private final String username;

    @NotEmpty
    @JsonProperty("firstname")
    private final String firstname;

    @NotEmpty
    @JsonProperty("lastname")
    private final String lastname;

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
    public ArtistProfileResponse(Long id, String username, String firstname, String lastname, String bio, String level,
                                 String location, Set<String> skills, Set<String> tags, Set<String> languages,
                                 Set<EducationDto> education, Set<ExperienceDto> experience, String website, String facebook,
                                 String linkedin, String instagram, String dribble, String pinterest, String twitter) {
        this.id = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
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
