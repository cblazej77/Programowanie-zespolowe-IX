package com.pz.login.model.chat;


import com.pz.login.model.user.UserEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "conversations")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user1_id")
    private UserEntity user1;
    @ManyToOne
    @JoinColumn(name = "user2_id")
    private UserEntity user2;
}
