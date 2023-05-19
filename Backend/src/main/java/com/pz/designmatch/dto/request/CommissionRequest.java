package com.pz.designmatch.dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.pz.designmatch.util.DefaultLocalDateTimeDeserializer;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommissionRequest {

    @NotEmpty
    @JsonProperty("client_username")
    private String clientUsername;

    //@NotEmpty zeby nie dodawać go pdoczas dodawania zlecenia
    @JsonProperty("contractor_username")
    private String contractorUsername;

    @NotEmpty
    @JsonProperty("title")
    private String title;

    @NotEmpty
    @JsonProperty("description")
    private String description;

    @JsonProperty("deadline")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
    @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
    private LocalDateTime deadline;

    @JsonProperty("level")
    private Set<String> level;

    @JsonProperty("location")
    private Set<String> location;

    @JsonProperty("skills")
    private Set<String> skills;

    @JsonProperty("tags")
    private Set<String> tags;

    @JsonProperty("languages")
    private Set<String> languages;

    @JsonProperty("rate")
    private Integer rate;
}


