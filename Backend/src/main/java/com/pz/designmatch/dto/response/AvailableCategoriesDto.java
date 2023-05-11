package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class AvailableCategoriesDto {
    private final List<CategoryDto> categoryDtoList;

    @JsonCreator
    public AvailableCategoriesDto(@JsonProperty("categories") List<CategoryDto> categoryDtoList) {
        this.categoryDtoList = categoryDtoList;
    }
}
