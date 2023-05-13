package com.pz.designmatch.comissions;


import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.pz.designmatch.model.user.UserEntity;
import lombok.Getter;
import org.apache.catalina.User;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
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
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
    @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
    private LocalDateTime deadline;
//    @JsonProperty("publishedAT")
//    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
//    @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
//    private LocalDateTime publishedAT;
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
    @JsonProperty("stawka")
    private Integer stawka;

    @JsonCreator
    public commissionDto(String title, String description, LocalDateTime deadline,
                         Set<String> level, Set<String> location, Set<String> skills,
                         Set<String> tags, Set<String> languages, Integer stawka) {
        //this.contractor = contractor;
        //this.client = client;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.level = level;
        this.location = location;
        this.skills = skills;
        this.tags = tags;
        this.languages = languages;
        this.stawka = stawka;
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
    public LocalDateTime getDeadline() {
        return deadline;
    }
    //@JsonGetter("publishedAT")
    //public LocalDateTime getPublishedAT() {
        //return publishedAT;
    //}
    @JsonGetter("level")
    public Set<String> getLevel() {
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
    @JsonGetter("stawka")
    public Integer getStawka() {
        return stawka;
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
