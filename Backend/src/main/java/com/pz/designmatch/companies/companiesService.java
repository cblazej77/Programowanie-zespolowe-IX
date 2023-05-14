package com.pz.designmatch.companies;

import com.pz.designmatch.model.user.CompanyProfile;
import com.pz.designmatch.repository.CompanyProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Service
public class companiesService {
    private CompanyProfileRepository companyProfileRepository;

    public companiesService(CompanyProfileRepository companyProfileRepository) {
        this.companyProfileRepository = companyProfileRepository;
    }

    public companiesDto mapToCompaniesDto(CompanyProfile companyProfile){
        if(companyProfile == null)
            return null;

        return new companiesDto(
                companyProfile.getName(),
                companyProfile.getDescription(),
                companyProfile.getProfileImageUrl(),
                companyProfile.getProfileBannerUrl(),
                companyProfile.getNIP(),
                companyProfile.getREGON(),
                companyProfile.getKRS(),
                companyProfile.getWebsite(),
                companyProfile.getFacebook(),
                companyProfile.getLinkedin(),
                companyProfile.getTwitter(),
                companyProfile.getInstagram()
        );
    }

    @Transactional
    public companiesDto createCompanyProfile(companiesDto companiesDto){
        CompanyProfile newCompanyProfile = new CompanyProfile();
        newCompanyProfile.setName(companiesDto.getName());
        if(companiesDto.getDescription() != null){
            newCompanyProfile.setDescription(companiesDto.getDescription());
        }
        if(companiesDto.getProfileImageUrl() != null){
            newCompanyProfile.setProfileImageUrl(companiesDto.getProfileImageUrl());
        }
        if(companiesDto.getProfileBannerUrl() != null){
            newCompanyProfile.setProfileBannerUrl(companiesDto.getProfileBannerUrl());
        }
        newCompanyProfile.setNIP(companiesDto.getNIP());
        newCompanyProfile.setREGON(companiesDto.getREGON());
        if(companiesDto.getKRS() != null){
            newCompanyProfile.setKRS(companiesDto.getKRS());
        }
        newCompanyProfile.setWebsite(companiesDto.getWebsite());
        if(companiesDto.getFacebook() != null){
            newCompanyProfile.setFacebook(companiesDto.getFacebook());
        }
        if (companiesDto.getTwitter() != null){
            newCompanyProfile.setTwitter(companiesDto.getTwitter());
        }
        if (companiesDto.getInstagram() != null){
            newCompanyProfile.setInstagram(companiesDto.getInstagram());
        }
        newCompanyProfile.setLinkedin(companiesDto.getLinkedin());
        return mapToCompaniesDto(companyProfileRepository.save(newCompanyProfile));

    }

    public companiesDto updateCompanyProfile(String name, companiesDto companiesDto){
        Optional<CompanyProfile> companyProfile = companyProfileRepository.findByName(name);
        CompanyProfile existingCompanyProfile = companyProfile.get();
        if(companiesDto.getName() != null){
            existingCompanyProfile.setName(companiesDto.getName());
        }
        if (companiesDto.getDescription() != null){
            existingCompanyProfile.setDescription(companiesDto.getDescription());
        }
        if (companiesDto.getProfileImageUrl() != null){
            existingCompanyProfile.setProfileImageUrl(companiesDto.getProfileImageUrl());
        }
        if (companiesDto.getProfileBannerUrl() != null){
            existingCompanyProfile.setProfileBannerUrl(companiesDto.getProfileBannerUrl());
        }
        if (companiesDto.getNIP() != null){
            existingCompanyProfile.setNIP(existingCompanyProfile.getNIP());
        }
        if (companiesDto.getREGON() != null){
            existingCompanyProfile.setREGON(existingCompanyProfile.getREGON());
        }
        if (companiesDto.getKRS() != null){
            existingCompanyProfile.setKRS(existingCompanyProfile.getKRS());
        }
        if (companiesDto.getWebsite() != null){
            existingCompanyProfile.setWebsite(existingCompanyProfile.getWebsite());
        }
        if (companiesDto.getFacebook() != null){
            existingCompanyProfile.setFacebook(existingCompanyProfile.getFacebook());
        }
        if (companiesDto.getTwitter() != null){
            existingCompanyProfile.setTwitter(existingCompanyProfile.getTwitter());
        }
        if (companiesDto.getInstagram() != null){
            existingCompanyProfile.setInstagram(existingCompanyProfile.getInstagram());
        }
        if (companiesDto.getLinkedin() != null){
            existingCompanyProfile.setLinkedin(existingCompanyProfile.getLinkedin());
        }
        return mapToCompaniesDto(companyProfileRepository.save(existingCompanyProfile));

    }

    public companiesDto getCompanyProfileByName(String name){
        return companyProfileRepository.findByName(name).map(this::mapToCompaniesDto)
                .orElseThrow(()-> new RuntimeException("CompanyProfile not found for name :" + name));
    }
}
