package com.pz.designmatch.model.user;

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
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String name;
    private String description;
    @Column(name = "profile_image_url")
    private String profileImageUrl;
    @Column(name = "profile_banner_url")
    private String profileBannerUrl;
    @Column(unique = true)
    private String NIP;
    private String REGON;
    private String KRS;
    private String website;
    private String facebook;
    private String linkedin;
    private String twitter;
    private String instagram;
    private String companyAdress;
}
