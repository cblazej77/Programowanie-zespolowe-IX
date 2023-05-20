package com.pz.designmatch.util.mapper;

import com.pz.designmatch.dto.request.ChatMessageRequest;
import com.pz.designmatch.dto.response.ChatMessageResponse;
import com.pz.designmatch.model.chat.ChatMessage;
import com.pz.designmatch.model.chat.ChatRoom;
import com.pz.designmatch.model.enums.MessageStatus;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ChatRoomRepository;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.impl.ChatRoomService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChatMessageMapper {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final ChatRoomService chatRoomService;

    @Autowired
    public ChatMessageMapper(ChatRoomRepository chatRoomRepository, ChatRoomService chatRoomService, UserRepository userRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatRoomService = chatRoomService;
        this.userRepository = userRepository;
    }


    public ChatMessageResponse mapToDto(ChatMessage chatMessage) {
        return new ChatMessageResponse(
                chatMessage.getId(),
                chatMessage.getChat().getId(),
                chatMessage.getSender().getId().toString(),
                chatMessage.getRecipient().getId().toString(),
                chatMessage.getSender().getUsername(),
                chatMessage.getRecipient().getUsername(),
                chatMessage.getContent(),
                chatMessage.getTimestamp());
    }

    public ChatMessage mapToEntity(ChatMessageRequest chatMessageRequest, Boolean createIfNotExist) {
        UserEntity sender = userRepository.findByUsername(chatMessageRequest.getSenderUsername())
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono użytkownika o nazwie: " + chatMessageRequest.getSenderUsername()));
        UserEntity recipient = userRepository.findByUsername(chatMessageRequest.getRecipientUsername())
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono użytkownika o nazwie: " + chatMessageRequest.getRecipientUsername()));

        String chatId = chatRoomService.getChatId(chatMessageRequest.getSenderUsername(), chatMessageRequest.getRecipientUsername(), createIfNotExist)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono czatu o nazwie: " + chatMessageRequest.getSenderUsername() + "_" + chatMessageRequest.getRecipientUsername()));

        ChatRoom chatRoom = chatRoomRepository.findByChatId(chatId)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono czatu o nazwie: " + chatMessageRequest.getSenderUsername() + "_" + chatMessageRequest.getRecipientUsername()));
        return new ChatMessage(
                chatRoom,
                sender,
                recipient,
                chatMessageRequest.getContent(),
                LocalDateTime.now(),
                MessageStatus.DELIVERED
        );
    }
}
