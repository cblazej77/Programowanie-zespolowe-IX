package com.pz.designmatch.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
public class ChatMessageRequest {

    @NotEmpty
    @JsonProperty("sender_username")
    private String senderUsername;

    @NotEmpty
    @JsonProperty("recipient_username")
    private String recipientUsername;

    @NotEmpty
    @JsonProperty("content")
    private String content;
}
