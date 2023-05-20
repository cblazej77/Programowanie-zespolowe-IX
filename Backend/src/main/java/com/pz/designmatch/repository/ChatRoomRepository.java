package com.pz.designmatch.repository;

import com.pz.designmatch.model.chat.ChatRoom;
import com.pz.designmatch.model.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByChatId(String id);

    Optional<ChatRoom> findBySenderAndRecipient(UserEntity sender, UserEntity recipient);
}
