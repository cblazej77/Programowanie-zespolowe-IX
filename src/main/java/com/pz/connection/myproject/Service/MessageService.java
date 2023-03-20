package com.pz.connection.myproject.Service;

import com.pz.connection.myproject.Repository.MessageRepository;
import com.pz.connection.myproject.entity.Message;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    private MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository){
        this.messageRepository = messageRepository;
    }

    public void sendMessage(String messageText, Long clientid, Long userid, byte[] picture){
        Message message = new Message();
        message.setMessageText(messageText);
        message.setClientid(clientid);
        message.setUserid(userid);
        message.setPicture(picture);
        messageRepository.save(message);
    }

    public List<Message> getMessages(Long clientid, Long userid){
        return messageRepository.findMessageByClientidAndUserid(clientid, userid);
    }
}
