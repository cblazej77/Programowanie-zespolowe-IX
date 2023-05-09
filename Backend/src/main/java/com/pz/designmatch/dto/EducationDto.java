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
public class EducationDto {
    @JsonProperty("school_name")
    private String schoolName;
    @JsonProperty("faculty")
    private String faculty;
    @JsonProperty("field_of_study")
    private String fieldOfStudy;
    @JsonProperty("degree")
    private String degree;
    @JsonProperty("start_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate startDate;
    @JsonProperty("end_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;
    @JsonProperty("description")
    private String description;

    @JsonCreator
    public EducationDto(String schoolName, String faculty, String fieldOfStudy, String degree, LocalDate startDate,
                        LocalDate endDate, String description) {
        this.schoolName = schoolName;
        this.faculty = faculty;
        this.fieldOfStudy = fieldOfStudy;
        this.degree = degree;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
