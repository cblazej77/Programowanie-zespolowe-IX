package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CategoryDto {
    private final List<String> subcategory;

    @JsonCreator
    public CategoryDto(@JsonProperty("subcategories") List<String> subcategory) {
        this.subcategory = subcategory;
    }

    public List<String> getTags() {
        return subcategory;
    }
}
