package com.pz.designmatch.model.chat;

import com.pz.designmatch.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "chat_rooms")
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chat_id")
    private String chatId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private UserEntity sender;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity recipient;

    public ChatRoom(String chatId, UserEntity sender, UserEntity recipient) {
        this.chatId = chatId;
        this.sender = sender;
        this.recipient = recipient;
    }
}
