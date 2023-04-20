package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pz.designmatch.model.enums.Category;
import com.pz.designmatch.model.enums.Subcategory;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
public class AvailableCategoriesDto {
    private final List<CategoryDto> categoryDtoList;

    @JsonCreator
    public AvailableCategoriesDto(@JsonProperty("categories") List<CategoryDto> categoryDtoList) {
        this.categoryDtoList = categoryDtoList;
    }
}
