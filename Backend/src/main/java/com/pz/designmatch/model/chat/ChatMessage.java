package com.pz.designmatch.model.chat;

import com.pz.designmatch.model.enums.MessageStatus;
import com.pz.designmatch.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private ChatRoom chat;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private UserEntity sender;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private UserEntity recipient;

    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime timestamp;

    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    public ChatMessage(ChatRoom chat, UserEntity sender, UserEntity recipient, String content, LocalDateTime timestamp, MessageStatus status) {
        this.chat = chat;
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.timestamp = timestamp;
        this.status = status;
    }
}
