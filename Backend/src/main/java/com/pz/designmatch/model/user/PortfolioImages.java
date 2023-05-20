package com.pz.designmatch.model.user;

import com.pz.designmatch.model.user.ArtistProfile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "portfolio_images")
public class PortfolioImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "artist_profile")
    private ArtistProfile artistProfile;

    private String imageUrl;
    private String name;
    private String description;

    public PortfolioImages(ArtistProfile artistProfile, String imageUrl,
                           String name, String description) {
        this.artistProfile = artistProfile;
        this.imageUrl = imageUrl;
        this.name = name;
        this.description = description;
    }

    public PortfolioImages() {}

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
