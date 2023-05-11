package com.pz.designmatch.model.user;

import com.pz.designmatch.model.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "artist_profiles")
public class ArtistProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;
    @Column(name = "profile_image_url")
    private String profileImageUrl;
    @Column(name = "profile_banner_url")
    private String profileBannerUrl;
    @ElementCollection
    @CollectionTable(name = "portfolio_images", joinColumns = @JoinColumn(name = "user_profile_id"))
    @Column(name = "portfolio_image_url")
    private Set<String> portfolioImagesUrls;
    private String bio;
    @Enumerated(EnumType.STRING)
    private Level level;
    @Enumerated(EnumType.STRING)
    private City location;
    @ElementCollection(targetClass = Skill.class)
    @Enumerated(EnumType.STRING)
    private Set<Skill> skills;
    @ElementCollection(targetClass = Tag.class)
    @Enumerated(EnumType.STRING)
    private Set<Tag> tags;
    @ElementCollection(targetClass = Language.class)
    @Enumerated(EnumType.STRING)
    private Set<Language> languages;
    private String website;
    private String facebook;
    private String linkedin;
    private String instagram;
    private String dribble;
    private String pinterest;
    private String twitter;

    public ArtistProfile(UserEntity user) {
        this.user = user;
    }

//    public Optional<Level> getLevel() {
//        return Optional.ofNullable(level);
//    }
}
