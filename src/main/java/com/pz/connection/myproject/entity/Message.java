package com.pz.connection.myproject.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;
import java.text.SimpleDateFormat;

@Entity
@Data
@Getter
@Setter
@Table(name = "Messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MESSAGE_ID", nullable = false, unique = true)
    private Long id;
    @Column(name = "CHAT_ID", nullable = false, unique = true)
    private Long ChatId;
    @Column(name = "USER_ID", nullable = false, unique = false)
    private Long userid;
    @Column(name = "MESSAGE_TEXT", nullable = false, unique = false, columnDefinition = "TEXT")
    private String messageText;
    @Column(name = "POST_DATE", nullable = false, unique = false)
    private SimpleDateFormat dataWyslania;
    @Column(name = "CLIENT_ID", nullable = false, unique = false)
    private Long clientid;
    @Lob
    @Column(name = "PICTURE", nullable = true, unique = false)
    private byte[] picture;

    @ManyToOne
    @JoinTable(name = "JOIN_TABLE_MESSAGES",
                joinColumns = {@JoinColumn(name = "Message_FK_Client", insertable = false, updatable = false,
                        referencedColumnName = "CLIENT_ID")},
                inverseJoinColumns = {@JoinColumn(name = "Client_FK_Message", insertable = false, updatable = false,
                        referencedColumnName = "ClientID")}
    )
    private Client refClient;

    public Client getRefClient() {
        return refClient;
    }

    public void setRefClient(Client refClient) {
        this.refClient = refClient;
    }

    @ManyToOne
    @JoinTable(name = "JOIN_TABLE_MESSAGES",
                joinColumns = {@JoinColumn(name = "Message_FK_User", insertable = false, updatable = false,
                        referencedColumnName = "USER_ID")},
                inverseJoinColumns = {@JoinColumn(name = "User_FK_Message",insertable = false, updatable = false,
                        referencedColumnName = "UserID")}
    )
    private User refUser;

    public User getRefUser() {
        return refUser;
    }

    public void setRefUser(User refUser) {
        this.refUser = refUser;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getChatId() {
        return ChatId;
    }

    public void setChatId(Long chatId) {
        ChatId = chatId;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public SimpleDateFormat getDataWyslania() {
        return dataWyslania;
    }

    public void setDataWyslania(SimpleDateFormat dataWyslania) {
        this.dataWyslania = dataWyslania;
    }

    public Long getClientid() {
        return clientid;
    }

    public void setClientid(Long clientid) {
        this.clientid = clientid;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }
}
