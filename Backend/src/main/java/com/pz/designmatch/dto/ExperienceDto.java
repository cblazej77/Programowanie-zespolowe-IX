package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ExperienceDto {

    @JsonProperty("company")
    private final String company;

    @JsonProperty("city")
    private final String city;

    @JsonProperty("position")
    private final String position;

    @JsonProperty("description")
    private final String description;

    @JsonProperty("start_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;

    @JsonProperty("end_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;

    @JsonCreator
    public ExperienceDto(String company, String city, String position, LocalDate startDate, LocalDate endDate, String description) {
        this.company = company;
        this.city = city;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
