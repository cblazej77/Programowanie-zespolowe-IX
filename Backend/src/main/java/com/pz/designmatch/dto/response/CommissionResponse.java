package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.pz.designmatch.util.DefaultLocalDateTimeDeserializer;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;
import java.util.Set;


@SuppressWarnings("unused")
public class CommissionResponse {

    @NotEmpty
    @JsonProperty("id")
    private Long id;

    @NotEmpty
    @JsonProperty("client_username")
    private String clientUsername;

    @NotEmpty
    @JsonProperty("contractor_username")
    private String contractorUsername;

    @NotEmpty
    @JsonProperty("title")
    private String title;

    @NotEmpty
    @JsonProperty("description")
    private String description;

    @NotEmpty
    @JsonProperty("commissioned_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
    @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
    private LocalDateTime commissionedAt;

    @JsonProperty("deadline")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
    @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
    private LocalDateTime deadline;

    @JsonProperty("completed_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
    @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
    private LocalDateTime completedAt;

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

    @JsonProperty("is_completed")
    private Boolean isCompleted;

    @JsonCreator
    public CommissionResponse(Long id, String clientUsername, String contractorUsername, String title, String description,
                              LocalDateTime commissionedAt, LocalDateTime deadline, LocalDateTime completedAt, Set<String> level,
                              Set<String> location, Set<String> skills, Set<String> tags, Set<String> languages, Integer rate, Boolean isCompleted) {
        this.id = id;
        this.clientUsername = clientUsername;
        this.contractorUsername = contractorUsername;
        this.title = title;
        this.description = description;
        this.commissionedAt = commissionedAt;
        this.deadline = deadline;
        this.completedAt = completedAt;
        this.level = level;
        this.location = location;
        this.skills = skills;
        this.tags = tags;
        this.languages = languages;
        this.rate = rate;
        this.isCompleted = isCompleted;
    }
}
