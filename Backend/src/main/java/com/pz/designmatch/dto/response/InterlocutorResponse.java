package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;

public class InterlocutorResponse {

    @NotEmpty
    @JsonProperty("username")
    private String username;

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("company_name")
    private String companyName;

    @NotEmpty
    @JsonProperty("last_message")
    private String lastMessage;

    public InterlocutorResponse(String username, String companyName, String lastMessage) {
        this.username = username;
        this.companyName = companyName;
        this.lastMessage = lastMessage;
    }

    public InterlocutorResponse(String username, String firstName, String lastName, String lastMessage) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.lastMessage = lastMessage;
    }
}
