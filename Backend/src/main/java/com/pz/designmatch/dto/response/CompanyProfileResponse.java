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
    @JsonProperty("nip")
    private String nip;

    @NotEmpty
    @JsonProperty("regon")
    private String regon;

    @JsonProperty("krs")
    private String krs;

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
    public CompanyProfileResponse(Long id, String username, String name, String description, String address, String nip, String regon,
                                  String krs, String website, String facebook, String linkedin, String twitter, String instagram) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.description = description;
        this.address = address;
        this.nip = nip;
        this.regon = regon;
        this.krs = krs;
        this.website = website;
        this.facebook = facebook;
        this.linkedin = linkedin;
        this.twitter = twitter;
        this.instagram = instagram;
    }
}
