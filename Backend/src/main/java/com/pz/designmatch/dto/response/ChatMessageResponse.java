package com.pz.designmatch.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.pz.designmatch.util.DefaultLocalDateTimeDeserializer;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ChatMessageResponse {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("chat_id")
    private Long chatId;

    @JsonProperty("sender_id")
    private String senderId;

    @JsonProperty("sender_username")
    private String senderUsername;

    @JsonProperty("recipient_id")
    private String recipientId;

    @JsonProperty("recipient_username")
    private String recipientUsername;

    @JsonProperty("content")
    private String content;

    @JsonProperty("timestamp")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Europe/Zagreb")
    @JsonDeserialize(using = DefaultLocalDateTimeDeserializer.class)
    private LocalDateTime timestamp;

    public ChatMessageResponse(Long id, Long chatId, String senderId, String senderUsername, String recipientId,
                               String recipientUsername, String content, LocalDateTime timestamp) {
        this.id = id;
        this.chatId = chatId;
        this.senderId = senderId;
        this.senderUsername = senderUsername;
        this.recipientId = recipientId;
        this.recipientUsername = recipientUsername;
        this.content = content;
        this.timestamp = timestamp;
    }
}
