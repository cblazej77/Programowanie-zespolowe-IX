package com.pz.designmatch.util;

import com.pz.designmatch.dto.response.AvailableCategoriesDto;
import com.pz.designmatch.dto.response.CategoryDto;
import com.pz.designmatch.model.enums.Category;
import com.pz.designmatch.model.enums.Subcategory;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AvailableCategoriesDtoBuilder {

    public static AvailableCategoriesDto getAvailableCategoriesDto() {
        List<CategoryDto> categoryDtoList = new ArrayList<>();
        List<Category> categories = List.of(Category.values());
        List<Subcategory> subcategories = List.of(Subcategory.values());

        for (Category category : categories) {
            List<String> subcategoryNames = subcategories.stream()
                    .filter(subcategory -> subcategory.getCategory().equals(category))
                    .map(Subcategory::getDisplayName)
                    .collect(Collectors.toList());

            categoryDtoList.add(new CategoryDto(category.getDisplayName(), subcategoryNames));
        }

        return new AvailableCategoriesDto(categoryDtoList);
    }
}