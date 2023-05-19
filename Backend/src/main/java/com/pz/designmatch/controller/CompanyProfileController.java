package com.pz.designmatch.controller;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import com.pz.designmatch.service.CompanyProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PutMapping(value = "/api/company/updateProfileByUsername/{username}", produces = apiVersionAccept, consumes = apiVersionAccept)
    public ResponseEntity<CompanyProfileResponse> updateCompanyProfileByUsername(@PathVariable("username") String username, @RequestBody CompanyProfileRequest companyProfile) {
        CompanyProfileResponse updatedCompanyProfile = companyProfileService.updateCompanyProfileByUsername(username, companyProfile);
        return ResponseEntity.ok(updatedCompanyProfile);
    }
//    @PutMapping(value = "/api/company/getAllCommissionFirmByUsername/{username}", produces = apiVersionAccept, consumes = apiVersionAccept)
//    public ResponseEntity<CompanyProfileResponse> getAllCommissionFirmByUsername(@PathVariable("username") String username, @RequestBody CompanyProfileRequest companyProfile) {
//        CompanyProfileResponse updatedCompanyProfile = companyProfileService.updateCompanyProfileByUsername(username, companyProfile);
//        return ResponseEntity.ok(updatedCompanyProfile);
//    }
}
