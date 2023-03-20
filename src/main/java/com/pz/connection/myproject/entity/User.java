package com.pz.connection.myproject.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.print.attribute.standard.DateTimeAtCreation;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@Table(name = "Users")
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID", nullable = false, unique = true)
    private Long id;
    @Column(name = "NAME", nullable = true, unique = false)
    private String Name;
    @Column(name = "NICKNAME", nullable = false, unique = true)
    private String Nickname;
    @Column(name = "LOGIN", nullable = false, unique = true)
    private String Login;
    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;
    @Column(name = "PASSWORD", nullable = false, unique = false)
    private String Password;
    @CreationTimestamp
    @Column(name = "CREATED_AT_DATE", nullable = false, unique = false)
    private DateTimeAtCreation DataStworzeniaProfila;
    @Column(columnDefinition = "TEXT", length = 255, name = "PROFILE_DESCRIPTION", nullable = true, unique = false)
    private String OpisProfila;
    @Column(columnDefinition = "TEXT", length = 50, name = "EXPERIENCE", nullable = true, unique = false)
    private String Wyksztalcenie;
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "NUMBER_OF_COMPLETED_ORDERS", nullable = true, unique = false)
    private Integer LiczbaZrealizowanychZlecen;
    @Column(length = 5, precision = 2, name = "AVERAGE_RATING_FOR_ORDERS", nullable = true, unique = false)
    private Double SredniaOcenZaZlecenia;
    @Column(name = "ADDITIONAL_LINKS", nullable = true, unique = false)
    private String DodatkoweLinki;
    @Lob
    @Column(name = "PROFILE_PIC", nullable = true, unique = false)
    private byte[] ProfilePicture;
    @Column(name = "LANGUAGES", nullable = true, unique = false)
    private String Jezyk;
    @Column(columnDefinition = "TEXT", name = "SKILLS", nullable = true, unique = false)
    private String Umiejetnosci;

    @OneToMany
    @JoinTable(name = "JOIN_TABLE",
        joinColumns = {@JoinColumn(name = "User_FK", referencedColumnName = "UserID")},
        inverseJoinColumns = {@JoinColumn(name = "Zlecenia_FK", referencedColumnName = "ORDER_DONE_BY")}
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
                joinColumns = {@JoinColumn(name = "User_FK_Message", referencedColumnName = "UserID")},
                inverseJoinColumns = {@JoinColumn(name = "Message_FK_User", referencedColumnName = "USER_ID")}
    )
    private List<Message> MessageList;

    public List<Message> getMessageList() {
        return MessageList;
    }
    public void setMessageList(List<Message> messageList) {
        MessageList = messageList;
    }

    public User(Long id, String Name, String Nickname, String Login, String Password, String OpisProfila,
                String Wykszalcenie, Integer LiczbaZrealizowanychZlecen, String DodatkoweLinki, byte[] ProfilePicture,
                String Jezyk, String Umiejetnosci){
        this.id = id;
        this.Name = Name;
        this.Nickname = Nickname;
        this.Login = Login;
        this.Password = Password;
        this.OpisProfila = OpisProfila;
        this.Wyksztalcenie = Wykszalcenie;
        this.LiczbaZrealizowanychZlecen = LiczbaZrealizowanychZlecen;
        this.DodatkoweLinki = DodatkoweLinki;
        this.ProfilePicture = ProfilePicture;
        this.Jezyk = Jezyk;
        this.Umiejetnosci = Umiejetnosci;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getNickname() {
        return Nickname;
    }

    public void setNickname(String nickname) {
        Nickname = nickname;
    }

    public String getLogin() {
        return Login;
    }

    public void setLogin(String login) {
        Login = login;
    }

    //public String getPassword() {
       // return Password;
    //}

    public void setPassword(String password) {
        Password = password;
    }

    public DateTimeAtCreation getDataStworzeniaProfila() {
        return DataStworzeniaProfila;
    }


    public String getOpisProfila() {
        return OpisProfila;
    }

    public void setOpisProfila(String opisProfila) {
        OpisProfila = opisProfila;
    }

    public String getWyksztalcenie() {
        return Wyksztalcenie;
    }

    public void setWyksztalcenie(String wyksztalcenie) {
        Wyksztalcenie = wyksztalcenie;
    }

    public Integer getLiczbaZrealizowanychZlecen() {
        return LiczbaZrealizowanychZlecen;
    }


    public Double getSredniaOcenZaZlecenia() {
        return SredniaOcenZaZlecenia;
    }


    public String getDodatkoweLinki() {
        return DodatkoweLinki;
    }

    public void setDodatkoweLinki(String dodatkoweLinki) {
        DodatkoweLinki = dodatkoweLinki;
    }

    public byte[] getProfilePicture() {
        return ProfilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        ProfilePicture = profilePicture;
    }

    public String getJezyk() {
        return Jezyk;
    }

    public void setJezyk(String jezyk) {
        Jezyk = jezyk;
    }

    public String getUmiejetnosci() {
        return Umiejetnosci;
    }

    public void setUmiejetnosci(String umiejetnosci) {
        Umiejetnosci = umiejetnosci;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", Name='" + Name + '\'' +
                ", Nickname='" + Nickname + '\'' +
                ", Login='" + Login + '\'' +
                ", email='" + email + '\'' +
                ", Password='" + Password + '\'' +
                ", DataStworzeniaProfila=" + DataStworzeniaProfila +
                ", OpisProfila='" + OpisProfila + '\'' +
                ", Wyksztalcenie='" + Wyksztalcenie + '\'' +
                ", LiczbaZrealizowanychZlecen=" + LiczbaZrealizowanychZlecen +
                ", SredniaOcenZaZlecenia=" + SredniaOcenZaZlecenia +
                ", DodatkoweLinki='" + DodatkoweLinki + '\'' +
                ", ProfilePicture=" + ProfilePicture +
                ", Jezyk='" + Jezyk + '\'' +
                ", Umiejetnosci='" + Umiejetnosci + '\'' +
                '}';
    }

}
