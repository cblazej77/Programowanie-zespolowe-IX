package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Set;

public final class ShortArtistProfileResponse {

    @JsonProperty("username")
    private final String username;

    @JsonProperty("firstname")
    private final String firstname;

    @JsonProperty("lastname")
    private final String lastname;

    @JsonProperty("city")
    private final String city;

    @JsonProperty("level")
    private final String level;

    @JsonProperty("skills")
    private final Set<String> skills;

    @JsonCreator
    public ShortArtistProfileResponse(String username, String firstname, String lastname, String level, String city, Set<String> skills) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.city = city;
        this.level = level;
        this.skills = skills;
    }
}