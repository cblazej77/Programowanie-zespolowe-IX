package com.pz.designmatch.controller;

import com.pz.designmatch.dto.ArtistProfileDto;
import com.pz.designmatch.dto.response.UserDto;
import com.pz.designmatch.exception.ArtistProfileNotFound;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.ArtistProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/artist")
public class UserProfileController {
    public static final String apiVersionAccept = "application/json";
    private final ArtistProfileService artistProfileService;
    private final UserRepository userRepository;

    @Autowired
    public UserProfileController(ArtistProfileService artistProfileService, UserRepository userRepository) {
        this.artistProfileService = artistProfileService;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/getUser", produces = apiVersionAccept)
    public ResponseEntity<UserDto> getAllUsers() {
        Optional<UserEntity> user = userRepository.findById(1L);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        UserDto userDto = mapUserEntityToDto(user.get());
//        return ResponseEntity
//                .status(HttpStatus.OK.value())
//                .body(userDto);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping(value = "/getArtistProfile", produces = apiVersionAccept)
    public ResponseEntity<ArtistProfileDto> getArtistProfileByUsername(@RequestParam String username) {
        ArtistProfileDto artistProfile = artistProfileService.getArtistProfileDtoByUsername(username);
        if (artistProfile == null) {
            throw new ArtistProfileNotFound("Artist profile not found for username: " + username);
        }
        return ResponseEntity
                .status(HttpStatus.OK.value())
                .body(artistProfile);
    }
//        try {
//            ArtistProfileDto artistProfile = artistProfileService.getArtistProfileDtoByUsername(username);
//            return ResponseEntity
//                    .status(HttpStatus.OK.value())
//                    .body(artistProfile);
//        } catch (UsernameNotFoundException ex) {
//            throw new UsernameNotFoundException("Artist profile not found for username: " + username);
//        } catch (Exception ex) {
//            throw new RuntimeException("Internal server error");
//        }

    @PutMapping(value = "/updateArtistProfile", consumes = MediaType.APPLICATION_JSON_VALUE, produces = apiVersionAccept)
    public ResponseEntity<ArtistProfileDto> updateArtistProfileByUsername(@RequestParam String username, @RequestBody ArtistProfileDto artistProfileDto) {
        try {
            ArtistProfileDto artistProfile = artistProfileService.updateArtistProfileByUsername(username, artistProfileDto);
            return ResponseEntity.ok(artistProfile);
        } catch (UsernameNotFoundException ex) {
            throw new UsernameNotFoundException("Artist profile not found for username: " + username);
        } catch (Exception ex) {
            throw new RuntimeException("Internal server error");
        }
    }

    private UserDto mapUserEntityToDto(UserEntity userEntity) {
        return new UserDto(
                userEntity.getUsername(),
                userEntity.getEmail(),
                userEntity.getFirstname(),
                userEntity.getLastname());
    }

}
