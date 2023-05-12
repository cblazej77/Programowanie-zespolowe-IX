package com.pz.designmatch.comissions;


import com.fasterxml.jackson.annotation.*;
import com.pz.designmatch.model.user.UserEntity;
import lombok.Getter;
import org.apache.catalina.User;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class commissionDto {

    //private Long id;
    //@JsonProperty("contractor")
    //private UserEntity contractor;
    //@JsonProperty("client")
    //private UserEntity client;
    @JsonProperty("title")
    private String title;
    @JsonProperty("description")
    private String description;
    @JsonProperty("deadline")
    private ZonedDateTime deadline;
    //@JsonProperty("completedAT")
    //private ZonedDateTime completedAT;
    @JsonProperty("publishedAT")
    private ZonedDateTime publishedAT = ZonedDateTime.now();
    @JsonProperty("level")
    private String level;
    @JsonProperty("location")
    private Set<String> location;
    @JsonProperty("skills")
    private Set<String> skills;
    @JsonProperty("tags")
    private Set<String> tags;
    @JsonProperty("languages")
    private Set<String> languages;

    //private boolean isCompleted = false;

    @JsonCreator
    public commissionDto(String title, String description, ZonedDateTime deadline, ZonedDateTime completedAT,
                         ZonedDateTime publishedAT, UserEntity contractor, UserEntity client, String level, Set<String> location, Set<String> skills,
                         Set<String> tags, Set<String> languages) {
        //this.contractor = contractor;
        //this.client = client;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        //this.completedAT = completedAT;
        this.publishedAT = publishedAT;
        this.level = level;
        this.location = location;
        this.skills = skills;
        this.tags = tags;
        this.languages = languages;
    }



    @JsonGetter("title")
    public String getTitle() {
        return title;
    }
    @JsonGetter("description")
    public String getDescription() {
        return description;
    }
    @JsonGetter("deadline")
    public ZonedDateTime getDeadline() {
        return deadline;
    }
    @JsonGetter("publishedAT")
    public ZonedDateTime getPublishedAT() {
        return publishedAT;
    }
    @JsonGetter("level")
    public String getLevel() {
        return level;
    }
    @JsonGetter("location")
    public Set<String> getLocation() {
        return location;
    }
    @JsonGetter("skills")
    public Set<String> getSkills() {
        return skills;
    }
    @JsonGetter("tags")
    public Set<String> getTags() {
        return tags;
    }
    @JsonGetter("languages")
    public Set<String> getLanguages() {
        return languages;
    }

//    public void setId(Long id) {
//        this.id = id;
//    }

//    public void setLocalPublishedAT(){
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
//        publishedAT = LocalDateTime.parse(publishedAT.format(formatter));
//    }
//    public void setLocalDeadline(){
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
//        deadline = LocalDateTime.parse(deadline.format(formatter));
//    }
//    public void setLocalCompletedAt(){
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
//        completedAT = LocalDateTime.parse(completedAT.format(formatter));
//    }

}
