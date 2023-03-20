package com.pz.connection.myproject.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.print.attribute.standard.DateTimeAtCreation;
import java.sql.Blob;
import java.sql.Date;
import java.text.SimpleDateFormat;

@Data
@Entity
@Table(name = "Orders")
@NoArgsConstructor
@Getter
@Setter
public class Zlecenia {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ORDER_NUMBER", nullable = false, unique = true)
    private Long NrZlecenia;
    @Column(columnDefinition = "TEXT", name = "TITLE", nullable = false, unique = false)
    private String Nazwa;
    @Column(columnDefinition = "TEXT", name = "DESCRIPTION", nullable = false, unique = false)
    private String Opis;
    @Lob
    @Column(name = "ORDER_DONE_PICTURE", nullable = true, unique = false)
    private byte[] WykonanaPraca;
    @CreationTimestamp
    @Column(name = "PUBLICATION_DATE", nullable = false, unique = false)
    private SimpleDateFormat DataPublikacji;
    @Column(name = "FINISH_DATE", nullable = false, unique = false)
    private SimpleDateFormat DataZakonczenia;
    @Column(name = "COMPANY", nullable = true, unique = false)
    private String Firma;
    @Column(name = "ORDER_DONE_BY", nullable = true, unique = false)
    private String UserID;
    @Column(columnDefinition = "TEXT", name = "TAGS", nullable = true, unique = false)
    private String Tagi;
    @Column(columnDefinition = "TEXT", name = "REQUIREMENTS", nullable = false, unique = false)
    private String Wymagania;
    @Column(name = "LANGUAGE", nullable = true, unique = false)
    private String Jezyk;

    @ManyToOne
    @JoinTable(name = "JOIN_TABLE",
        joinColumns = {@JoinColumn(name = "Zlecenia_FK", insertable = false, updatable = false,
                        referencedColumnName = "ORDER_DONE_BY")},
        inverseJoinColumns = {@JoinColumn(name = "User_FK", insertable = false, updatable = false,
                        referencedColumnName = "UserID")}
    )
    private User refUser;

    public User getRefUser() {
        return refUser;
    }

    public void setRefUser(User refUser) {
        this.refUser = refUser;
    }

    @ManyToOne
    @JoinTable(name = "JOIN_TABLE",
            joinColumns = {@JoinColumn(name = "Zlecenia_FK", insertable = false, updatable = false,
                    referencedColumnName = "ORDER_NUMBER")},
            inverseJoinColumns = {@JoinColumn(name = "Client_FK", insertable = false, updatable = false,
                    referencedColumnName = "ORDER_NUMBER")}
    )
    private Client refClient;

    public Client getRefClient() {
        return refClient;
    }

    public void setRefClient(Client refClient) {
        this.refClient = refClient;
    }

    public Long getNrZlecenia() {
        return NrZlecenia;
    }

    public String getNazwa() {
        return Nazwa;
    }

    public String getOpis() {
        return Opis;
    }

    public byte[] getWykonanaPraca() {
        return WykonanaPraca;
    }

    public SimpleDateFormat getDataPublikacji() {
        return DataPublikacji;
    }

    public SimpleDateFormat getDataZakonczenia() {
        return DataZakonczenia;
    }

    public String getFirma() {
        return Firma;
    }

    public String getUserID() {
        return UserID;
    }

    public String getTagi() {
        return Tagi;
    }

    public String getWymagania() {
        return Wymagania;
    }

    public String getJezyk() {
        return Jezyk;
    }

    public void setNazwa(String nazwa) {
        Nazwa = nazwa;
    }

    public void setOpis(String opis) {
        Opis = opis;
    }

    public void setWykonanaPraca(byte[] wykonanaPraca) {
        WykonanaPraca = wykonanaPraca;
    }

    public void setDataZakonczenia(SimpleDateFormat dataZakonczenia) {
        DataZakonczenia = dataZakonczenia;
    }

    public void setFirma(String firma) {
        Firma = firma;
    }

    public void setTagi(String tagi) {
        Tagi = tagi;
    }

    public void setWymagania(String wymagania) {
        Wymagania = wymagania;
    }

    public void setJezyk(String jezyk) {
        Jezyk = jezyk;
    }
}
