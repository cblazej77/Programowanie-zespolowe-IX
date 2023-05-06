package com.pz.designmatch.controller;

import com.pz.designmatch.dto.ArtistProfileDto;
import com.pz.designmatch.dto.response.AvailableCategoriesDto;
import com.pz.designmatch.dto.response.ShortProfileDto;
import com.pz.designmatch.dto.response.UserDto;
import com.pz.designmatch.exception.ArtistProfileNotFound;
import com.pz.designmatch.model.enums.City;
import com.pz.designmatch.model.enums.Language;
import com.pz.designmatch.model.enums.Level;
import com.pz.designmatch.model.enums.Tag;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.ArtistProfileService;
import com.pz.designmatch.util.AvailableCategoriesDtoBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping(value = "/getAvailableCategories", produces = apiVersionAccept)
    public ResponseEntity<AvailableCategoriesDto> getAvailableCategories() {
        AvailableCategoriesDto categoryOptionsDto = AvailableCategoriesDtoBuilder.getAvailableCategoriesDto();
        return ResponseEntity.ok(categoryOptionsDto);
    }

    @GetMapping(value = "/getAvailableCities", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAvailableCities() {
        List<String> cities = City.getAvailableCities();
        return ResponseEntity.ok(cities);
    }

    @GetMapping(value = "/getAvailableLevels", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAvailableLevels() {
        List<String> levels = Level.getAvailableLevels();
        return ResponseEntity.ok(levels);
    }

    @GetMapping(value = "/getAvailableTags", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAvailableTags() {
        List<String> tags = Tag.getAvailableTags();
        return ResponseEntity.ok(tags);
    }

    @GetMapping(value = "/getAvailableLanguages", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAvailableLanguages() {
        List<String> languages = Language.getAvailableLanguages();
        return ResponseEntity.ok(languages);
    }

    @GetMapping(value = "/getAllUsernames", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAllUsernames() {
        List<String> usernames = artistProfileService.getAllUsernames();
        return ResponseEntity.ok(usernames);
    }

    @GetMapping(value = "/getShortArtistProfile", produces = apiVersionAccept)
    public ResponseEntity<ShortProfileDto> getShortArtistProfileByUsername(@RequestParam String username) {
        ShortProfileDto artistProfile = artistProfileService.getShortArtistProfileDtoByUsername(username);
        if (artistProfile == null) {
            throw new ArtistProfileNotFound("Artist profile not found for username: " + username);
        }
        return ResponseEntity
                .status(HttpStatus.OK.value())
                .body(artistProfile);
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
