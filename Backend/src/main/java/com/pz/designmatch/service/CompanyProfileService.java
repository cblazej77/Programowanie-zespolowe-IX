package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;

public interface CompanyProfileService {

    CompanyProfileResponse updateCompanyProfileByUsername(String username, CompanyProfileRequest companiesDto);

    CompanyProfileResponse getCompanyProfileByUsername(String username);
}
