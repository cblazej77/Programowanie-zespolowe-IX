package com.pz.designmatch.util;

import com.pz.designmatch.dto.response.AvailableSkillsCategoriesDto;
import com.pz.designmatch.dto.response.SkillsCategoryDto;
import com.pz.designmatch.model.enums.SkillsCategory;
import com.pz.designmatch.model.enums.Skill;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AvailableCategoriesDtoBuilder {

    public static AvailableSkillsCategoriesDto getAvailableCategoriesDto() {
        List<SkillsCategoryDto> skillsCategoryDtoList = new ArrayList<>();
        List<SkillsCategory> categories = List.of(SkillsCategory.values());
        List<Skill> skills = List.of(Skill.values());

        for (SkillsCategory skillsCategory : categories) {
            List<String> skillsNames = skills.stream()
                    .filter(skill -> skill.getSkillsCategory().equals(skillsCategory))
                    .map(Skill::getDisplayName)
                    .collect(Collectors.toList());

            skillsCategoryDtoList.add(new SkillsCategoryDto(skillsCategory.getDisplayName(), skillsNames));
        }

        return new AvailableSkillsCategoriesDto(skillsCategoryDtoList);
    }
}