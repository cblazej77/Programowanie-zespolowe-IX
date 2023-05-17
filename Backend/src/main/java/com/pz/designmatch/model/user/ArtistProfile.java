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

    @OneToOne(mappedBy = "artistProfile")
    private UserEntity user;

    private String firstname;

    private String lastname;

    private String bio;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "profile_banner_url")
    private String profileBannerUrl;

    @ElementCollection
    @CollectionTable(name = "portfolio_images", joinColumns = @JoinColumn(name = "user_profile_id"))
    @Column(name = "portfolio_image_url")
    private Set<String> portfolioImagesUrls;

    @Enumerated(EnumType.STRING)
    private Level level;

    @Enumerated(EnumType.STRING)
    private City city;

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

    public ArtistProfile(String firstname, String lastname, String bio, Level level, City city, Set<Skill> skills, Set<Tag> tags, Set<Language> languages,
                         String website, String facebook, String linkedin, String instagram, String dribble, String pinterest, String twitter) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.bio = bio;
        this.level = level;
        this.city = city;
        this.skills = skills;
        this.tags = tags;
        this.languages = languages;
        this.website = website;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.instagram = instagram;
        this.dribble = dribble;
        this.pinterest = pinterest;
        this.twitter = twitter;
    }
}
