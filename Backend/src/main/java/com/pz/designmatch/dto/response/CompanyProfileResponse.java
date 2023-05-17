package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

@SuppressWarnings({"unused", "SpellCheckingInspection"})
public class CompanyProfileResponse {

    @NotEmpty
    @JsonProperty("id")
    private Long id;

    @NotEmpty
    @JsonProperty("username")
    private String username;

    @NotEmpty
    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("address")
    private String address;

    @NotEmpty
    @JsonProperty("NIP")
    private String NIP;

    @NotEmpty
    @JsonProperty("REGON")
    private String REGON;

    @JsonProperty("KRS")
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
    public CompanyProfileResponse(Long id, String username, String name, String description, String address, String NIP, String REGON,
                                  String KRS, String website, String facebook, String linkedin, String twitter, String instagram) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.description = description;
        this.address = address;
        this.NIP = NIP;
        this.REGON = REGON;
        this.KRS = KRS;
        this.website = website;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.twitter = twitter;
        this.instagram = instagram;
    }
}
