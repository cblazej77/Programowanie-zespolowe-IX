package com.pz.designmatch.service.impl;

import com.pz.designmatch.dto.request.CompanyProfileRequest;
import com.pz.designmatch.dto.response.CompanyProfileResponse;
import com.pz.designmatch.model.user.CompanyProfile;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.CompanyProfileRepository;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.CompanyProfileService;
import com.pz.designmatch.util.mapper.CompanyProfileMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanyProfileServiceImpl implements CompanyProfileService {

    private final CompanyProfileRepository companyProfileRepository;
    private final CompanyProfileMapper companyProfileMapper;
    private final UserRepository userRepository;

    @Autowired
    public CompanyProfileServiceImpl(CompanyProfileRepository companyProfileRepository, CompanyProfileMapper companyProfileMapper,
                                     UserRepository userRepository) {
        this.companyProfileRepository = companyProfileRepository;
        this.companyProfileMapper = companyProfileMapper;
        this.userRepository = userRepository;
    }

    @Override
    public CompanyProfileResponse updateCompanyProfileByUsername(String username, CompanyProfileRequest companiesDto) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("This user doesn't exist: " + username));

        CompanyProfile existingCompanyProfile = companyProfileRepository.findByUser_Username(username)
                .orElseGet(() -> {
                    CompanyProfile newcompanyProfile = new CompanyProfile();
                    newcompanyProfile.setUser(user);
                    return companyProfileRepository.save(newcompanyProfile);
                });

        Optional.ofNullable(companiesDto.getName()).ifPresent(existingCompanyProfile::setName);
        Optional.ofNullable(companiesDto.getDescription()).ifPresent(existingCompanyProfile::setDescription);
        Optional.ofNullable(companiesDto.getRegon()).ifPresent(existingCompanyProfile::setREGON);
        Optional.ofNullable(companiesDto.getKrs()).ifPresent(existingCompanyProfile::setKRS);
        Optional.ofNullable(companiesDto.getWebsite()).ifPresent(existingCompanyProfile::setWebsite);
        Optional.ofNullable(companiesDto.getFacebook()).ifPresent(existingCompanyProfile::setFacebook);
        Optional.ofNullable(companiesDto.getTwitter()).ifPresent(existingCompanyProfile::setTwitter);
        Optional.ofNullable(companiesDto.getInstagram()).ifPresent(existingCompanyProfile::setInstagram);
        Optional.ofNullable(companiesDto.getLinkedin()).ifPresent(existingCompanyProfile::setLinkedin);
        Optional.ofNullable(companiesDto.getAddress()).ifPresent(existingCompanyProfile::setAddress);

        return companyProfileMapper.mapToResponse(companyProfileRepository.save(existingCompanyProfile));
    }

    @Override
    public CompanyProfileResponse getCompanyProfileByUsername(String username) {
        return companyProfileMapper.mapToResponse(companyProfileRepository.findByUser_Username(username)
                .orElseThrow(() -> new EntityNotFoundException("Nie znaleziono profilu firmy dla użytkownika " + username)));
    }
}