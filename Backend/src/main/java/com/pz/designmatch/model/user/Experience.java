package com.pz.designmatch.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "artist_profile_id")
    private ArtistProfile artistProfile;
    private String company;
    private String city;
    private String position;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate startDate;
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate endDate;
    private String description;

    public Experience(ArtistProfile artistProfile, String company, String city, String position, LocalDate startDate, LocalDate endDate, String description) {
        this.artistProfile = artistProfile;
        this.company = company;
        this.city = city;
        this.position = position;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}
