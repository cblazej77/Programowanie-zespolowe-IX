package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.YearMonth;

@Getter
public class ExperienceDto {
    private String company;
    private String city;
    private String position;
    private YearMonth startDate;
    private YearMonth endDate;
    private String description;

    @JsonCreator
    public ExperienceDto(@JsonProperty("company") String company,
                         @JsonProperty("city") String city,
                         @JsonProperty("position") String position,
                         @JsonProperty("start_date") YearMonth startDate,
                         @JsonProperty("end_date") YearMonth endDate,
                         @JsonProperty("description") String description) {
        this.company = company;
        this.city = city;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
