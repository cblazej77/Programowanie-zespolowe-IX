package com.pz.designmatch.controller;

import com.pz.designmatch.dto.ArtistProfileDto;
import com.pz.designmatch.service.ArtistProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/artists")
public class UserProfileController {
    private final ArtistProfileService artistProfileService;
    public static final String apiVersionAccept = "application/json";

    @Autowired
    public UserProfileController(ArtistProfileService artistProfileService) {
        this.artistProfileService = artistProfileService;
    }

    @GetMapping(value = "/getArtistProfile/{id:[0-9]+}", produces = apiVersionAccept)
    public ResponseEntity<ArtistProfileDto> getArtistProfileById(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK.value())
                .body(null);
    }

}
