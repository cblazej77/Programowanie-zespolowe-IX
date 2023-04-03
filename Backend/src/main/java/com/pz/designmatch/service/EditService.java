package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.EditingAndPrintDto;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.Education;
import com.pz.designmatch.model.user.Experience;
import com.pz.designmatch.repository.ArtistProfileRepository;
import com.pz.designmatch.repository.EducationRepository;
import com.pz.designmatch.repository.ExperienceRepository;
import com.pz.designmatch.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class EditService {
    @Autowired
    private final UserRepository userRepository;
    private final EducationRepository educationRepository;
    private final ExperienceRepository experienceRepository;
    private final ArtistProfileRepository artistProfileRepository;

    public ArtistProfile editUser(EditingAndPrintDto editingAndPrintDto) throws UsernameNotFoundException{
        Optional<ArtistProfile> artistProfile = artistProfileRepository.findById(editingAndPrintDto.getId().intValue());
        Optional<Education> education = educationRepository.findById(editingAndPrintDto.getId().intValue());
        Optional<Experience> experience = experienceRepository.findById(editingAndPrintDto.getId().intValue());
        if(artistProfile.isEmpty()){
            throw new UsernameNotFoundException("User nor found");
        }
        ArtistProfile artistProfile1 = artistProfile.get();
        Education education1 = education.get();
        Experience experience1 = experience.get();
        artistProfile1.setTags(editingAndPrintDto.getTags());
        artistProfile1.setSkills(editingAndPrintDto.getSkills());
        artistProfile1.setLocation(editingAndPrintDto.getLocation());
        artistProfile1.setLanguages(editingAndPrintDto.getLanguages());
        //artistProfile1.setLevel(editingAndPrintDto.getLevel());
        //experience1.setDescription(editingAndPrintDto.getExperiences());
        artistProfileRepository.save(artistProfile1);
        return artistProfile1;
    }
}
