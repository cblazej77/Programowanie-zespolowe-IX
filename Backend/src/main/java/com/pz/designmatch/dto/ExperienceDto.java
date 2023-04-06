package com.pz.designmatch.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.YearMonthDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.YearMonthSerializer;
import lombok.Getter;

import java.time.YearMonth;

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

    @JsonCreator
    public ExperienceDto(String company, String city, String position, YearMonth startDate, YearMonth endDate,
                         String description) {
        this.company = company;
        this.city = city;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
