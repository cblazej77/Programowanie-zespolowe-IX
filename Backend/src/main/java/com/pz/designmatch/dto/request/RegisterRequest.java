package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
@SuppressWarnings("SpellCheckingInspection")
public class RegisterRequest {

    @NotEmpty
    @JsonProperty("email")
    private String email;

    @NotEmpty
    @JsonProperty("username")
    private String username;


    @NotEmpty
    @JsonProperty("password")
    @Schema(description = "Hasło musi mieć minimum 6 znaków.", minLength = 6)
    private String password;

    @NotEmpty
    @JsonProperty("matching_password")
    @Schema(description = "Hasło musi mieć minimum 6 znaków.", minLength = 6)
    private String matchingPassword;
}

