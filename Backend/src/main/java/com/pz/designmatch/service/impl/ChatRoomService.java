package com.pz.designmatch.service.impl;

import com.pz.designmatch.model.chat.ChatRoom;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ChatRoomRepository;
import com.pz.designmatch.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;

    @Autowired
    public ChatRoomService(ChatRoomRepository chatRoomRepository, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
    }

    public Optional<String> getChatId(String senderUsername, String recipientUsername, boolean createIfNotExist) {
        UserEntity existingSender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono użytkownika o nazwie: " + senderUsername));

        UserEntity existingRecipient = userRepository.findByUsername(recipientUsername)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono użytkownika o nazwie: " + recipientUsername));

        var chatId = String.format("%d_%d", existingSender.getId(), existingRecipient.getId());
        Optional<ChatRoom> existingChatRoom = chatRoomRepository.findBySenderAndRecipient(existingSender, existingRecipient);
        if (existingChatRoom.isEmpty()) {
            if (!createIfNotExist) {
                return Optional.empty();
            }
            ChatRoom senderRecipient = new ChatRoom(chatId, existingSender, existingRecipient);
            ChatRoom recipientSender = new ChatRoom(chatId, existingRecipient, existingSender);
            chatRoomRepository.save(senderRecipient);
            chatRoomRepository.save(recipientSender);
            return Optional.of(chatId);
        }
        return existingChatRoom.map(ChatRoom::getChatId);
    }

    public Optional<List<ChatRoom>> findChatBySender(String username) {
        UserEntity existingUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono użytkownika o nazwie: " + username));
        return chatRoomRepository.findChatBySender(existingUser);
    }
}
