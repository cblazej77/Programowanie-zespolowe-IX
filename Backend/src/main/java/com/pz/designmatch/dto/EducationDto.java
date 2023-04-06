package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.pz.designmatch.util.YearMonthDeserializer;
import com.pz.designmatch.util.YearMonthSerializer;
import lombok.Getter;

import java.time.YearMonth;

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
    @JsonSerialize(using = YearMonthSerializer.class)
    @JsonDeserialize(using = YearMonthDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/yyyy")
    @JsonProperty("start_date")
    private YearMonth startDate;
    @JsonSerialize(using = YearMonthSerializer.class)
    @JsonDeserialize(using = YearMonthDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/yyyy")
    @JsonProperty("end_date")
    private YearMonth endDate;
    @JsonProperty("description")
    private String description;

    public EducationDto() {
    }

    @JsonCreator
    public EducationDto(String schoolName, String faculty, String fieldOfStudy, String degree, YearMonth startDate,
                        YearMonth endDate, String description) {
        this.schoolName = schoolName;
        this.faculty = faculty;
        this.fieldOfStudy = fieldOfStudy;
        this.degree = degree;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
