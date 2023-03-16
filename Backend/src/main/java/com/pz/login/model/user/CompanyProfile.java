package com.pz.login.model.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "company_profiles")
public class CompanyProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private UserEntity user;
    private String name;
    @Column(name = "profile_image_url")
    private String profileImageUrl;
    @Column(name = "profile_banner_url")
    private String profileBannerUrl;
    private String website;
    private String facebook;
    private String linkedin;
    private String twitter;
}
