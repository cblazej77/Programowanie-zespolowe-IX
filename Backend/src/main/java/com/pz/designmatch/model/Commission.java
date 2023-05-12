package com.pz.designmatch.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "commissions")
public class Commission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "client_id")
    private UserEntity client;
    @OneToOne
    @JoinColumn(name = "contractor_id")
    private UserEntity contractor;
    private String title;
    private String description;
    private ZonedDateTime commissionedAt = ZonedDateTime.now();
    private ZonedDateTime deadline;
    private ZonedDateTime completedAt;
    @Enumerated(EnumType.STRING)
    private Level level;
    @ElementCollection(targetClass = City.class)
    @Enumerated(EnumType.STRING)
    private Set<City> location;
    @ElementCollection(targetClass = Skill.class)
    @Enumerated(EnumType.STRING)
    private Set<Skill> skills;
    @ElementCollection(targetClass = Tag.class)
    @Enumerated(EnumType.STRING)
    private Set<Tag> tags;
    @ElementCollection(targetClass = Language.class)
    @Enumerated(EnumType.STRING)
    private Set<Language> languages;
    @Column(name = "is_completed")
    private boolean isCompleted = false;
}
