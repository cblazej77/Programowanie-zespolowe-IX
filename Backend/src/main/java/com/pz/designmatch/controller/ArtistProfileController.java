package com.pz.designmatch.controller;

import com.pz.designmatch.dto.request.ArtistFilterRequest;
import com.pz.designmatch.dto.request.ArtistProfileRequest;
import com.pz.designmatch.dto.response.ArtistProfileResponse;
import com.pz.designmatch.dto.response.ShortArtistProfileResponse;
import com.pz.designmatch.service.impl.ArtistProfileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

@RestController
public class ArtistProfileController {

    private final ArtistProfileServiceImpl artistProfileServiceImpl;

    @Autowired
    public ArtistProfileController(ArtistProfileServiceImpl artistProfileServiceImpl) {
        this.artistProfileServiceImpl = artistProfileServiceImpl;
    }

    @GetMapping(value = "/public/api/artist/getArtistProfileByUsername/{username}", produces = apiVersionAccept)
    public ResponseEntity<ArtistProfileResponse> getArtistProfileByUsername(@PathVariable("username") String username) {
        ArtistProfileResponse artistProfile = artistProfileServiceImpl.getArtistProfileByUsername(username);
        return ResponseEntity
                .status(HttpStatus.OK.value())
                .body(artistProfile);
    }

    @GetMapping(value = "/public/api/artist/getShortArtistProfileByUsername/{username}", produces = apiVersionAccept)
    public ResponseEntity<ShortArtistProfileResponse> getShortArtistProfileByUsername(@PathVariable String username) {
        ShortArtistProfileResponse artistProfile = artistProfileServiceImpl.getShortArtistProfileByUsername(username);
        return ResponseEntity.ok(artistProfile);
    }

    @PostMapping(value = "/public/api/artist/filter", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<Page<ShortArtistProfileResponse>> filterArtists(@RequestBody ArtistFilterRequest filterRequest,
                                                                          @RequestParam(defaultValue = "0", name = "page") int page,
                                                                          @RequestParam(defaultValue = "10", name = "size") int size) {
        Page<ShortArtistProfileResponse> filteredArtists = artistProfileServiceImpl.filterArtistProfiles(filterRequest, PageRequest.of(page, size));
        return ResponseEntity.ok(filteredArtists);
    }



    @PutMapping(value = "/api/artist/updateProfileByUsername/{username}", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<ArtistProfileResponse> updateCompanyProfileByUsername(@PathVariable("username") String username, @RequestBody ArtistProfileRequest artistProfile) {
        ArtistProfileResponse updatedArtistProfile = artistProfileServiceImpl.updateArtistProfileByUsername(username, artistProfile);
        return ResponseEntity.ok(updatedArtistProfile);
    }
}
