package com.pz.login.model.chat;

import com.pz.login.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "messages")
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user1_id")
    private UserEntity sender;

    @ManyToOne
    @JoinColumn(name = "user2_id")
    private UserEntity recipient;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;

    private String text;

    private LocalDateTime timestamp;

    public Message() {
        this.timestamp = LocalDateTime.now();
    }
}
