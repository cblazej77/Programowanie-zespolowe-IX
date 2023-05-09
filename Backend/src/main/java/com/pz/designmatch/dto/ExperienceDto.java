package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Getter
public class ExperienceDto {
    @JsonProperty("company")
    private final String company;
    @JsonProperty("city")
    private final String city;
    @JsonProperty("position")
    private final String position;
    @JsonProperty("start_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;
    @JsonProperty("end_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;
    @JsonProperty("description")
    private final String description;

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
