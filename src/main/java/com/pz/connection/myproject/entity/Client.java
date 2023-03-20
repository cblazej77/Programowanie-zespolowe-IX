package com.pz.connection.myproject.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Entity
@Getter
@Setter
@Table(name = "Clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ClientID", nullable = false, unique = true)
    private Long id;
    @Column(name = "NICKNAME", nullable = false, unique = true)
    private String Nickname;
    @Column(name = "LOGIN", nullable = false, unique = true)
    private String Login;
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;
    @Column(name = "PASSWORD", nullable = false, unique = false)
    private String password;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ORDER_NUMBER", nullable = true, unique = true)
    private Long NrZlecenia;

    @OneToMany
    @JoinTable(name = "JOIN_TABLE",
            joinColumns = {@JoinColumn(name = "Client_FK", referencedColumnName = "ORDER_NUMBER")},
            inverseJoinColumns = {@JoinColumn(name = "Zlecenia_FK", referencedColumnName = "ORDER_NUMBER")}
    )
    private List<Zlecenia> ZleceniaList;

    public List<Zlecenia> getZleceniaList() {
        return ZleceniaList;
    }

    public void setZleceniaList(List<Zlecenia> zleceniaList) {
        ZleceniaList = zleceniaList;
    }

    @OneToMany
    @JoinTable(name = "JOIN_TABLE_MESSAGES",
                joinColumns = {@JoinColumn(name = "Client_FK_Message", referencedColumnName = "ClientID")},
                inverseJoinColumns = {@JoinColumn(name = "Message_FK_Client", referencedColumnName = "CLIENT_ID")}
    )
    private List<Message> MessageList;

    public List<Message> getMessageList() {
        return MessageList;
    }

    public void setMessageList(List<Message> messageList) {
        MessageList = messageList;
    }



    public Long getId() {
        return id;
    }

    public String getLogin() {
        return Login;
    }

    public String getEmail() {
        return email;
    }

    public Long getNrZlecenia() {
        return NrZlecenia;
    }

    public void setNickname(String nickname) {
        Nickname = nickname;
    }

    public void setLogin(String login) {
        Login = login;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Client{" +
                "id=" + id +
                ", Nickname='" + Nickname + '\'' +
                ", Login='" + Login + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", NrZlecenia=" + NrZlecenia +
                '}';
    }
}
