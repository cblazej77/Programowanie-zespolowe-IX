package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CategoryOptionsDto {
    private final List<CategoryDto> categoryDtoList;

    @JsonCreator
    public CategoryOptionsDto(@JsonProperty("categories") List<CategoryDto> categoryDtoList) {
        this.categoryDtoList = categoryDtoList;
    }

    public List<CategoryDto> getCategories() {
        return categoryDtoList;
    }
}
