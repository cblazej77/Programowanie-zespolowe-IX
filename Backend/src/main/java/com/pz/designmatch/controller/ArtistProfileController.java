package com.pz.designmatch.controller;

import com.pz.designmatch.dto.request.ArtistFilterRequest;
import com.pz.designmatch.dto.request.ArtistProfileRequest;
import com.pz.designmatch.dto.response.ArtistProfileResponse;
import com.pz.designmatch.dto.response.ShortArtistProfileResponse;
import com.pz.designmatch.service.ArtistProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

@RestController
@RequestMapping("/api/artist")
public class ArtistProfileController {

    private final ArtistProfileService artistProfileService;

    @Autowired
    public ArtistProfileController(ArtistProfileService artistProfileService) {
        this.artistProfileService = artistProfileService;
    }

    @GetMapping(value = "/getArtistProfile/{username}", produces = apiVersionAccept)
    public ResponseEntity<ArtistProfileResponse> getArtistProfileByUsername(@PathVariable("username") String username) {
        ArtistProfileResponse artistProfile = artistProfileService.getArtistProfile(username);
        return ResponseEntity
                .status(HttpStatus.OK.value())
                .body(artistProfile);
    }

    @GetMapping(value = "/getShortArtistProfile/{username}", produces = apiVersionAccept)
    public ResponseEntity<ShortArtistProfileResponse> getShortArtistProfileByUsername(@PathVariable String username) {
        ShortArtistProfileResponse artistProfile = artistProfileService.getShortArtistProfile(username);
        return ResponseEntity.ok(artistProfile);
    }

    @PutMapping(value = "/updateProfile/{username}", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<ArtistProfileResponse> updateCompanyProfile(@PathVariable("username") String username, @RequestBody ArtistProfileRequest artistProfile) {
        ArtistProfileResponse updatedArtistProfile = artistProfileService.updateArtistProfileByUsername(username, artistProfile);
        return ResponseEntity.ok(updatedArtistProfile);
    }

    @PostMapping(value = "/filter", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<Page<ShortArtistProfileResponse>> filterArtists(@RequestBody ArtistFilterRequest filterRequest,
                                                                          @RequestParam(defaultValue = "0", name = "page") int page,
                                                                          @RequestParam(defaultValue = "10", name = "size") int size) {
        Page<ShortArtistProfileResponse> filteredArtists = artistProfileService.filterArtistProfiles(filterRequest, PageRequest.of(page, size));
        return ResponseEntity.ok(filteredArtists);
    }
}
