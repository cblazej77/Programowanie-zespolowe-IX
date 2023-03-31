package com.pz.designmatch.dto;

import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.Education;
import com.pz.designmatch.model.user.Experience;
import lombok.Data;

import java.util.Set;

@Data
public class EditingAndPrintDto {
    private Long id;
    private String username;
    private Set<Level> level;
    private Set<City> location;
    private Set<Subcategory> skills;
    private Set<Tag> tags;
    private Set<Language> languages;
    private Set<Education> education;
    private Set<Experience> experiences;
}
