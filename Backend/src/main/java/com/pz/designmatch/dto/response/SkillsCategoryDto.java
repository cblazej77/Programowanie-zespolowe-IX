package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class SkillsCategoryDto {
    private final String name;
    private final List<String> skills;

    @JsonCreator
    public SkillsCategoryDto(@JsonProperty String name, @JsonProperty("subcategories") List<String> skills) {
        this.name = name;
        this.skills = skills;
    }
}
