package com.pz.designmatch.service.impl;

import com.pz.designmatch.dto.request.ChatMessageRequest;
import com.pz.designmatch.dto.response.ChatMessageResponse;
import com.pz.designmatch.dto.response.InterlocutorResponse;
import com.pz.designmatch.model.chat.ChatMessage;
import com.pz.designmatch.model.chat.ChatRoom;
import com.pz.designmatch.model.enums.MessageStatus;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ChatMessageRepository;
import com.pz.designmatch.util.mapper.ChatMessageMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final ChatMessageMapper chatMessageMapper;
    private final ChatRoomService chatRoomService;

    @Autowired
    public ChatMessageService(ChatMessageRepository chatMessageRepository, ChatMessageMapper chatMessageMapper, ChatRoomService chatRoomService) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatMessageMapper = chatMessageMapper;
        this.chatRoomService = chatRoomService;
    }

    public ChatMessageResponse saveChatMessage(ChatMessageRequest chatMessageRequest) {
        ChatMessage chatMessage = chatMessageMapper.mapToEntity(chatMessageRequest, true);
        return chatMessageMapper.mapToDto(chatMessageRepository.save(chatMessage));
    }

    public long countNewMessages(String senderId, String recipientId) {
        return chatMessageRepository.countBySenderIdAndRecipientIdAndStatus(
                senderId, recipientId, MessageStatus.RECEIVED);
    }

    public List<ChatMessageResponse> findChatMessages(String senderId, String recipientId) {
        String chatId = chatRoomService.getChatId(senderId, recipientId, false)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono czatu o nazwie: " + senderId + "_" + recipientId));
        List<ChatMessage> messages = chatId.isEmpty() ? new ArrayList<>() : chatMessageRepository.findByChatId(chatId);

        if (messages.size() > 0) {
            updateStatuses(messages);
        }

        List<ChatMessageResponse> result = new ArrayList<>();
        for (ChatMessage message : messages) {
            result.add(chatMessageMapper.mapToDto(message));
        }
        return result;
    }

    public ChatMessageResponse findById(Long id) {
        return chatMessageRepository.findById(id)
                .map(chatMessage -> {
                    chatMessage.setStatus(MessageStatus.DELIVERED);
                    return chatMessageMapper.mapToDto(chatMessageRepository.save(chatMessage));
                })
                .orElseThrow(() ->
                        new EntityNotFoundException("Nie znaleziono wiadomości o id: " + id));
    }

    public void updateStatuses(List<ChatMessage> messages) {
        for (ChatMessage message : messages) {
            if (message.getStatus().equals(MessageStatus.RECEIVED)) {
                message.setStatus(MessageStatus.DELIVERED);
                chatMessageRepository.save(message);
            }
        }
    }

    public List<InterlocutorResponse> findConversations(String username) {
        List<InterlocutorResponse> result = new ArrayList<>();
        List<ChatRoom> chatRooms = chatRoomService.findChatBySender(username)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono czatu dla użytkownika: " + username));
        for (ChatRoom chatRoom : chatRooms) {
            UserEntity interlocutor = chatRoom.getRecipient();
            ChatMessage lastMessage = chatMessageRepository.findFirstByIdOrderByTimestampDesc(chatRoom.getChatId())
                    .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono wiadomości dla czatu: " + chatRoom.getChatId()));
            if (interlocutor.getArtistProfile() != null)
                result.add(new InterlocutorResponse(interlocutor.getUsername(), interlocutor.getArtistProfile().getFirstname(),
                        interlocutor.getArtistProfile().getLastname(), lastMessage.getContent()));
            else
                result.add(new InterlocutorResponse(interlocutor.getUsername(), interlocutor.getCompanyProfile().getName(), lastMessage.getContent()));
        }
        return result;
    }
}
