package com.pz.designmatch.companies;

import com.pz.designmatch.comissions.commissionDto;
import com.pz.designmatch.repository.CompanyProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/companies")
public class companiesController {
    public static final String apiVersionAccept = "application/json";
    private final companiesService companiesService;

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    public companiesController(com.pz.designmatch.companies.companiesService companiesService, CompanyProfileRepository companyProfileRepository) {
        this.companiesService = companiesService;
        this.companyProfileRepository = companyProfileRepository;
    }

    @PostMapping(value = "/createCompanyProfile", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<companiesDto> createCompanyProfile(@RequestBody companiesDto companiesDto){
        try{
            companiesDto newCompanyProfile = companiesService.createCompanyProfile(companiesDto);
            return ResponseEntity.ok(newCompanyProfile);
        } catch (Exception ex){
            throw new RuntimeException("Internal server error (creation)");
        }
    }

    @PutMapping(value = "/updateCompanyProfileByName", produces = apiVersionAccept, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<companiesDto> updateCompanyProfile(@RequestParam String name, @RequestBody companiesDto companiesDto){
        try {
            companiesDto updateCompanyProfile = companiesService.updateCompanyProfile(name, companiesDto);
            return ResponseEntity.ok(updateCompanyProfile);
        } catch (Exception ex) {
            throw new RuntimeException("Internal server error (updating)");
        }
    }

    @GetMapping(value = "/getCompanyProfileByName", produces = apiVersionAccept)
    public ResponseEntity<companiesDto> getCompanyProfileByName(@RequestParam String name){
        companiesDto getCompany = companiesService.getCompanyProfileByName(name);
        return ResponseEntity.status(HttpStatus.OK.value()).body(getCompany);
    }

}
