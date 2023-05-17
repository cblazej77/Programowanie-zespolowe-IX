package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record SkillsCategoryResponse(@JsonProperty("name") String name, @JsonProperty("skills") List<String> skills) {

    @JsonCreator
    public SkillsCategoryResponse(String name, List<String> skills) {
        this.name = name;
        this.skills = skills;
    }
}
