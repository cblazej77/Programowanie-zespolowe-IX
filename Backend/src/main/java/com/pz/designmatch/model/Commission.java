package com.pz.designmatch.model;

import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
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

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime commissionedAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime deadline;

    private LocalDateTime completedAt;

    @ElementCollection(targetClass = Level.class)
    @Enumerated(EnumType.STRING)
    private Set<Level> level;

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

    private Integer rate;

    @Column(name = "is_completed")
    private boolean isCompleted = false;

    public Commission(UserEntity client, UserEntity contractor, String title, String description,
                      LocalDateTime commissionedAt, LocalDateTime deadline, Set<Level> level, Set<City> location,
                      Set<Skill> skills, Set<Tag> tags, Set<Language> languages, Integer rate) {
        this.client = client;
        this.contractor = contractor;
        this.title = title;
        this.description = description;
        this.commissionedAt = commissionedAt;
        this.deadline = deadline;
        this.level = level;
        this.location = location;
        this.skills = skills;
        this.tags = tags;
        this.languages = languages;
        this.rate = rate;
    }
}
