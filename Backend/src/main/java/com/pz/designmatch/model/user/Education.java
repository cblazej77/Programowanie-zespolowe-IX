package com.pz.designmatch.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    private ArtistProfile artistProfile;
    private String schoolName;
    private String faculty;
    private String fieldOfStudy;
    private String degree;
    private String startDate;
    private String endDate;
    private String description;
}
