package com.pz.login.model;

import com.pz.login.model.enums.*;
import com.pz.login.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
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
    private LocalDateTime commissionedAt;
    private LocalDateTime deadline;
    private LocalDateTime completedAt;
    @Enumerated(EnumType.STRING)
    private Level level;
    @ElementCollection(targetClass = City.class)
    @Enumerated(EnumType.STRING)
    private Set<City> location;
    @ElementCollection(targetClass = Subcategory.class)
    @Enumerated(EnumType.STRING)
    private Set<Subcategory> skills;
    @ElementCollection(targetClass = Tag.class)
    @Enumerated(EnumType.STRING)
    private Set<Tag> tags;
    @ElementCollection(targetClass = Language.class)
    @Enumerated(EnumType.STRING)
    private Set<Language> languages;
    @Column(name = "is_completed")
    private boolean isCompleted = false;
}
