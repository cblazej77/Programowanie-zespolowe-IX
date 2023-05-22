package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public final class AvailableSkillsCategoriesResponse {

    @JsonProperty("categories")
    private final List<SkillsCategoryResponse> skillsCategoryResponseList;


    public AvailableSkillsCategoriesResponse(List<SkillsCategoryResponse> skillsCategoryResponseList) {
        this.skillsCategoryResponseList = skillsCategoryResponseList;
    }
}
