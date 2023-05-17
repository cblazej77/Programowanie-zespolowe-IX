package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommissionFilterRequest {

    @JsonProperty("levels")
    private Set<String> levels;

    @JsonProperty("locations")
    private Set<String> locations;

    @JsonProperty("skills")
    private Set<String> skills;

    @JsonProperty("tags")
    private Set<String> tags;

    @JsonProperty("languages")
    private Set<String> languages;
}
