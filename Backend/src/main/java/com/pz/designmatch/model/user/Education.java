package com.pz.designmatch.model.user;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.YearMonth;

@Entity
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
    private YearMonth startDate;
    private YearMonth endDate;
    private String description;

    public Education(String schoolName, String faculty, String fieldOfStudy, String degree, YearMonth startDate,
                     YearMonth endDate, String description) {
        this.schoolName = schoolName;
        this.faculty = faculty;
        this.fieldOfStudy = fieldOfStudy;
        this.degree = degree;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public ArtistProfile getArtistProfile() {
        return artistProfile;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getFaculty() {
        return faculty;
    }

    public String getFieldOfStudy() {
        return fieldOfStudy;
    }

    public String getDegree() {
        return degree;
    }

    public YearMonth getStartDate() {
        return startDate;
    }

    public YearMonth getEndDate() {
        return endDate;
    }

    public String getDescription() {
        return description;
    }
}
