package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Getter
@EqualsAndHashCode(callSuper = true)
public class ArtistRegisterRequest extends RegisterRequest {

    @NotEmpty
    @JsonProperty("firstname")
    private String firstname;

    @NotEmpty
    @JsonProperty("lastname")
    private String lastname;
}
