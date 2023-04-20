package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class CategoryDto {
    private final String name;
    private final List<String> subcategory;

    @JsonCreator
    public CategoryDto(@JsonProperty String name, @JsonProperty("subcategories") List<String> subcategory) {
        this.name = name;
        this.subcategory = subcategory;
    }
}
