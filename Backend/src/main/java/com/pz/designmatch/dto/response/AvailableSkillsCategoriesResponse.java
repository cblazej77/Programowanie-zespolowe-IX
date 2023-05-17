package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record AvailableSkillsCategoriesResponse(
        @JsonProperty("categories") List<SkillsCategoryResponse> skillsCategoryResponseList) {

    @JsonCreator
    public AvailableSkillsCategoriesResponse(List<SkillsCategoryResponse> skillsCategoryResponseList) {
        this.skillsCategoryResponseList = skillsCategoryResponseList;
    }
}
