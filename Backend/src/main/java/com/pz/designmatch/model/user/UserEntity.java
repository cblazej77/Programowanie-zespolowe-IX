package com.pz.designmatch.model.user;

import com.pz.designmatch.repository.RoleRepository;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {

    private static RoleRepository roleRepository;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String username;

    @NotNull
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();

    @Column
    private Boolean enabled;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "artist_profile_id", referencedColumnName = "id")
    private ArtistProfile artistProfile;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private CompanyProfile companyProfile;

    public UserEntity(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public void addRole(Role role) {
        this.roles.add(role);
    }
}