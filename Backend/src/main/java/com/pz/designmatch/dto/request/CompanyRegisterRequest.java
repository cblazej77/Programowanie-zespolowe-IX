package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;


@Getter
@EqualsAndHashCode(callSuper = true)
@SuppressWarnings("SpellCheckingInspection")
public class CompanyRegisterRequest extends RegisterRequest {

    @NotEmpty
    @JsonProperty("name")
    private String name;

    @NotEmpty
    @JsonProperty("NIP")
    private String NIP;

    @NotEmpty
    @JsonProperty("REGON")
    private String REGON;

    @JsonProperty("KRS")
    private String KRS;
}