package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class AvailableSkillsCategoriesDto {
    private final List<SkillsCategoryDto> skillsCategoryDtoList;

    @JsonCreator
    public AvailableSkillsCategoriesDto(@JsonProperty("categories") List<SkillsCategoryDto> skillsCategoryDtoList) {
        this.skillsCategoryDtoList = skillsCategoryDtoList;
    }
}
