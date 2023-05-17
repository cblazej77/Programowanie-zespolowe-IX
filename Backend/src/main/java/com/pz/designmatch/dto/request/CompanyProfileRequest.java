package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@SuppressWarnings("SpellCheckingInspection")
public class CompanyProfileRequest {

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
}
