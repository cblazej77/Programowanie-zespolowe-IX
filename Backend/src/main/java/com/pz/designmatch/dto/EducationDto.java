package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class EducationDto {
    private String schoolName;
    private String faculty;
    private String fieldOfStudy;
    private String degree;
    private String startDate;
    private String endDate;
    private String description;

    @JsonCreator
    public EducationDto(@JsonProperty("school_name") String schoolName,
                        @JsonProperty("faculty") String faculty,
                        @JsonProperty("field_of_study") String fieldOfStudy,
                        @JsonProperty("degree") String degree,
                        @JsonProperty("start_date") String startDate,
                        @JsonProperty("end_date") String endDate,
                        @JsonProperty("description") String description) {
        this.schoolName = schoolName;
        this.faculty = faculty;
        this.fieldOfStudy = fieldOfStudy;
        this.degree = degree;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
