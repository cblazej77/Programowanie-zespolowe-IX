package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import org.springframework.transaction.annotation.Transactional;

public interface CompanyProfileService {
    @Transactional(readOnly = true)
    CompanyProfileResponse updateCompanyProfileByUsername(String username, CompanyProfileRequest companiesDto);

    @Transactional(readOnly = true)
    CompanyProfileResponse getCompanyProfileByUsername(String username);
}
