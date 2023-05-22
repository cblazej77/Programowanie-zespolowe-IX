package com.pz.designmatch.controller;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.ApiResponse;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import com.pz.designmatch.service.CompanyProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

@RestController
public class CompanyProfileController {

    private final CompanyProfileService companyProfileService;

    public CompanyProfileController(CompanyProfileService companyProfileService) {
        this.companyProfileService = companyProfileService;
    }

    @GetMapping(value = "/public/api/company/getProfileByUsername/{username}", produces = apiVersionAccept)
    public ResponseEntity<CompanyProfileResponse> getCompanyProfileByUsername(@PathVariable("username") String username) {
        CompanyProfileResponse company = companyProfileService.getCompanyProfileByUsername(username);
        return ResponseEntity.status(HttpStatus.OK.value()).body(company);
    }

    @GetMapping(value = "/public/api/company/getProfileImageByUsername/{username}", produces = apiVersionAccept)
    public ResponseEntity<byte[]> getProfileImageByUsername(@PathVariable("username") String username) {
        byte[] bytes = companyProfileService.getProfileImageByUsername(username);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(bytes);
    }



    @PutMapping(value = "/api/company/updateProfileByUsername/{username}", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<CompanyProfileResponse> updateCompanyProfileByUsername(@PathVariable("username") String username, @RequestBody CompanyProfileRequest companyProfile) {
        CompanyProfileResponse updatedCompanyProfile = companyProfileService.updateCompanyProfileByUsername(username, companyProfile);
        return ResponseEntity.ok(updatedCompanyProfile);
    }

    @PostMapping(value = "/api/company/uploadProfileImage/{username}", produces = apiVersionAccept, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> uploadProfileImage(@PathVariable("username") String username, @RequestParam("file") MultipartFile file) {
        companyProfileService.uploadProfileImage(username, file);
        return ResponseEntity.ok(new ApiResponse(true, "Pomyślnie zaktualizowano zdjęcie profilowe"));
    }
}
