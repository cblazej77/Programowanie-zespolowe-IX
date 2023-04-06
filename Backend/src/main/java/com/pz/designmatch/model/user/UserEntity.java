package com.pz.designmatch.model.user;

import com.pz.designmatch.model.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private ArtistProfile artistProfile;

    @PostPersist
    public void onCreate() {
        if (role == Role.ARTIST) {
            ArtistProfile artistProfile = new ArtistProfile(this);
            this.artistProfile = artistProfile;
        }
    }
}