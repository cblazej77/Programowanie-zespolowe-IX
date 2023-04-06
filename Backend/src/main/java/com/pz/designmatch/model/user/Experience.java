package com.pz.designmatch.model.user;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.YearMonth;

@Entity
@NoArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_profile_id")
    private ArtistProfile artistProfile;
    private String company;
    private String city;
    private String position;
    private YearMonth startDate;
    private YearMonth endDate;
    private String description;

    public Experience(String company, String city, String position, YearMonth startDate, YearMonth endDate, String description) {
        this.company = company;
        this.city = city;
        this.position = position;
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

    public String getCompany() {
        return company;
    }

    public String getCity() {
        return city;
    }

    public String getPosition() {
        return position;
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
