package com.pz.designmatch.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "portfolio_entries")
public class PortfolioEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "artist_profile")
    private ArtistProfile artistProfile;

    private String imageUrl;

    private String name;

    private String description;

    public PortfolioEntry(ArtistProfile artistProfile, String imageUrl,
                          String name, String description) {
        this.artistProfile = artistProfile;
        this.imageUrl = imageUrl;
        this.name = name;
        this.description = description;
    }
}
