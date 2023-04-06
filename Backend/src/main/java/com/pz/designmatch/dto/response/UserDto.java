package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class UserDto {
    @JsonProperty("email")
    private String email;
    @JsonProperty("username")
    private String username;
    @JsonProperty("firstname")
    private String firstname;
    @JsonProperty("lastname")
    private String lastname;

    @JsonCreator
    public UserDto(String email, String username, String firstname, String lastname) {
        this.email = email;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
