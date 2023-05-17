package com.pz.designmatch.service.impl;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import com.pz.designmatch.model.user.CompanyProfile;
import com.pz.designmatch.repository.CompanyProfileRepository;
import com.pz.designmatch.service.CompanyProfileService;
import com.pz.designmatch.util.mapper.CompanyProfileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class CompanyProfileServiceImpl implements CompanyProfileService {

    private final CompanyProfileRepository companyProfileRepository;
    private final CompanyProfileMapper companyProfileMapper;

    @Autowired
    public CompanyProfileServiceImpl(CompanyProfileRepository companyProfileRepository, CompanyProfileMapper companyProfileMapper) {
        this.companyProfileRepository = companyProfileRepository;
        this.companyProfileMapper = companyProfileMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public CompanyProfileResponse updateCompanyProfileByUsername(String username, CompanyProfileRequest companiesDto) {
        CompanyProfile existingCompanyProfile = companyProfileRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono profilu firmy dla użytkownika " + username));

        Optional.ofNullable(companiesDto.getName()).ifPresent(existingCompanyProfile::setName);
        Optional.ofNullable(companiesDto.getDescription()).ifPresent(existingCompanyProfile::setDescription);
        Optional.ofNullable(companiesDto.getAddress()).ifPresent(existingCompanyProfile::setAddress);
        Optional.ofNullable(companiesDto.getRegon()).ifPresent(existingCompanyProfile::setREGON);
        Optional.ofNullable(companiesDto.getKrs()).ifPresent(existingCompanyProfile::setKRS);
        Optional.ofNullable(companiesDto.getWebsite()).ifPresent(existingCompanyProfile::setWebsite);
        Optional.ofNullable(companiesDto.getFacebook()).ifPresent(existingCompanyProfile::setFacebook);
        Optional.ofNullable(companiesDto.getLinkedin()).ifPresent(existingCompanyProfile::setLinkedin);
        Optional.ofNullable(companiesDto.getTwitter()).ifPresent(existingCompanyProfile::setTwitter);
        Optional.ofNullable(companiesDto.getInstagram()).ifPresent(existingCompanyProfile::setInstagram);

        return companyProfileMapper.mapToResponse(companyProfileRepository.save(existingCompanyProfile));

    }

    @Override
    @Transactional(readOnly = true)
    public CompanyProfileResponse getCompanyProfileByUsername(String username) {
        return companyProfileMapper.mapToResponse(companyProfileRepository.findByUser_Username(username)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono profilu firmy dla użytkownika " + username)));
    }
}