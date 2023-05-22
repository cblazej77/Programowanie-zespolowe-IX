package com.pz.designmatch.repository;

import com.pz.designmatch.model.chat.ChatMessage;
import com.pz.designmatch.model.enums.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    long countBySenderIdAndRecipientIdAndStatus(
            String senderId, String recipientId, MessageStatus status);

    @Query("select cm from ChatMessage cm where cm.chat.chatId = ?1")
    List<ChatMessage> findByChatId(String chatId);

    @Query("select cm from ChatMessage cm where cm.chat.chatId = ?1 order by cm.timestamp desc limit 1")
    Optional<ChatMessage> findFirstByIdOrderByTimestampDesc(String chatId);
}
