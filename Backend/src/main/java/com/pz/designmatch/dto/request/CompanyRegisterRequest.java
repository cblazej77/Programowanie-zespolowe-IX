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
    @JsonProperty("nip")
    private String nip;

    @NotEmpty
    @JsonProperty("regon")
    private String regon;

    @JsonProperty("krs")
    private String krs;
}