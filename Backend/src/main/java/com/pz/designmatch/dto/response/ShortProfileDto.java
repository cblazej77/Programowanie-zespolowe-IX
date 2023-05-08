package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ShortProfileDto {
    @JsonProperty
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
    public ShortProfileDto(String username, String firstname, String lastname, String city, String level, Set<String> skills) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.city = city;
        this.level = level;
        this.skills = skills;
    }
}