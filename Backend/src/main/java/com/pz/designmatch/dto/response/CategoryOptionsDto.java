package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CategoryOptionsDto {
    private List<CategoryDto> categoryDtos;

    @JsonCreator
    public CategoryOptionsDto(@JsonProperty("categories") List<CategoryDto> categoryDtos) {
        this.categoryDtos = categoryDtos;
    }

    public List<CategoryDto> getCategories() {
        return categoryDtos;
    }
}
