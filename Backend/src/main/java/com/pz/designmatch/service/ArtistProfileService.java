package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.ArtistFilterRequest;
import com.pz.designmatch.dto.request.ArtistProfileRequest;
import com.pz.designmatch.dto.response.ArtistProfileResponse;
import com.pz.designmatch.dto.response.ShortArtistProfileResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArtistProfileService {
    ArtistProfileResponse getArtistProfileByUsername(String username);

    ShortArtistProfileResponse getShortArtistProfileByUsername(String username);

    @Transactional
    ArtistProfileResponse updateArtistProfileByUsername(String username, ArtistProfileRequest artistProfile);

    Page<ShortArtistProfileResponse> filterArtistProfiles(ArtistFilterRequest filterRequest, Pageable pageable);
}
