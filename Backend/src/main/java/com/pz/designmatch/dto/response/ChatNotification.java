package com.pz.designmatch.dto.response;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ChatNotification {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("senderId")
    private String senderId;

    @JsonProperty("senderName")
    private String senderName;


    @JsonCreator
    public ChatNotification(Long id, String senderId, String senderName) {
        this.id = id;
        this.senderId = senderId;
        this.senderName = senderName;
    }
}