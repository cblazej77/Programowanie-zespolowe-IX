package com.pz.designmatch.controller;

import com.pz.designmatch.dto.request.ArtistFilterRequest;
import com.pz.designmatch.dto.request.ArtistProfileRequest;
import com.pz.designmatch.dto.response.ApiResponse;
import com.pz.designmatch.dto.response.ArtistProfileResponse;
import com.pz.designmatch.dto.response.PortfolioEntryResponse;
import com.pz.designmatch.dto.response.ShortArtistProfileResponse;
import com.pz.designmatch.service.impl.ArtistProfileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<ShortArtistProfileResponse> getShortArtistProfileByUsername(@PathVariable("username") String username) {
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

    @GetMapping(value = "/public/api/artist/getProfileImageByUsername/{username}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getProfileImage(@PathVariable("username") String username) {
        byte[] bytes = artistProfileServiceImpl.getProfileImageByUsername(username);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);
    }

    @GetMapping(value = "/public/api/artist/getPortfolioImage/{username}/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getPortfolioImage(@PathVariable("username") String username, @PathVariable("imageId") Long imageId) {
        byte[] bytes = artistProfileServiceImpl.getPortfolioImage(username, imageId);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);
    }

    @GetMapping(value = "/public/api/artist/getPortfolioEntries/{username}", produces = apiVersionAccept)
    public ResponseEntity<Page<PortfolioEntryResponse>> getPortfolioEntries(@PathVariable("username") String username,
                                                                            @RequestParam(defaultValue = "0", name = "page") int page,
                                                                            @RequestParam(defaultValue = "10", name = "size") int size) {
        Page<PortfolioEntryResponse> portfolioEntries = artistProfileServiceImpl.getPortfolioEntries(username, PageRequest.of(page, size));
        return ResponseEntity.ok(portfolioEntries);
    }

    @PutMapping(value = "/api/artist/updateProfileByUsername/{username}", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<ArtistProfileResponse> updateArtistProfileByUsername(@PathVariable("username") String username,
                                                                               @RequestBody ArtistProfileRequest artistProfile) {
        ArtistProfileResponse updatedArtistProfile = artistProfileServiceImpl.updateArtistProfileByUsername(username, artistProfile);
        return ResponseEntity.ok(updatedArtistProfile);
    }

    @PostMapping(value = "/api/artist/updateProfileImage/{username}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = apiVersionAccept)
    public ResponseEntity<ApiResponse> updateProfileImageByUsername(@PathVariable("username") String username, @RequestParam("image") MultipartFile multipartFile) {
        artistProfileServiceImpl.uploadProfileImage(username, multipartFile);
        return ResponseEntity.ok(new ApiResponse(true, "Pomyślnie zaktualizowano zdjęcie profilowe"));
    }

    @PostMapping(value = "/api/artist/createPortfolioEntry/{username}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = apiVersionAccept)
    public ResponseEntity<ApiResponse> uploadPortfolioImageByUsername(@PathVariable("username") String username, @RequestParam("image") MultipartFile image,
                                                            @RequestParam String name, @RequestParam String description) {
        artistProfileServiceImpl.uploadPortfolioImage(username, image, name, description);
        return ResponseEntity.ok(new ApiResponse(true, "Pomyślnie dodano zdjęcie do portfolio"));
    }
}
