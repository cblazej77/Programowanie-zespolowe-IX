package com.pz.designmatch.companies;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.pz.designmatch.model.user.UserEntity;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class companiesDto {
    //private UserEntity user;
    @JsonProperty("name")
    private String name;
    @JsonProperty("description")
    private String description;
    @JsonProperty("profileImageUrl")
    private String profileImageUrl;
    @JsonProperty("profileBannerUrl")
    private String profileBannerUrl;
    @JsonProperty("nip")
    private String NIP;
    @JsonProperty("regon")
    private String REGON;
    @JsonProperty("krs")
    private String KRS;
    @JsonProperty("website")
    private String website;
    @JsonProperty("facebook")
    private String facebook;
    @JsonProperty("linkedin")
    private String linkedin;
    @JsonProperty("twitter")
    private String twitter;
    @JsonProperty("instagram")
    private String instagram;

    @JsonCreator
    public companiesDto(String name, String description, String profileImageUrl,
                        String profileBannerUrl, String NIP, String REGON, String KRS, String website,
                        String facebook, String linkedin, String twitter, String instagram) {
        //this.user = user;
        this.name = name;
        this.description = description;
        this.profileImageUrl = profileImageUrl;
        this.profileBannerUrl = profileBannerUrl;
        this.NIP = NIP;
        this.REGON = REGON;
        this.KRS = KRS;
        this.website = website;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.twitter = twitter;
        this.instagram = instagram;
    }

    @JsonGetter("name")
    public String getName() {
        return name;
    }
    @JsonGetter("description")
    public String getDescription() {
        return description;
    }
    @JsonGetter("profileImageUrl")
    public String getProfileImageUrl() {
        return profileImageUrl;
    }
    @JsonGetter("profileBannerUrl")
    public String getProfileBannerUrl() {
        return profileBannerUrl;
    }
    @JsonGetter("nip")
    public String getNIP() {
        return NIP;
    }
    @JsonGetter("regon")
    public String getREGON() {
        return REGON;
    }
    @JsonGetter("krs")
    public String getKRS() {
        return KRS;
    }
    @JsonGetter("website")
    public String getWebsite() {
        return website;
    }
    @JsonGetter("facebook")
    public String getFacebook() {
        return facebook;
    }
    @JsonGetter("linkedin")
    public String getLinkedin() {
        return linkedin;
    }
    @JsonGetter("twitter")
    public String getTwitter() {
        return twitter;
    }
    @JsonGetter("instagram")
    public String getInstagram() {
        return instagram;
    }
}
