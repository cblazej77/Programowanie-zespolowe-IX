package com.pz.designmatch.util.mapper;

import com.pz.designmatch.dto.ExperienceDto;
import com.pz.designmatch.model.user.ArtistProfile;
import com.pz.designmatch.model.user.Experience;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ExperienceMapper {
    public Set<Experience> mapDtoSetToEntitySet(Set<ExperienceDto> experienceDtos, ArtistProfile artistProfile) {
        return experienceDtos.stream()
                .map(experienceRequest -> mapToEntity(experienceRequest, artistProfile))
                .collect(Collectors.toSet());
    }

    public Experience mapToEntity(ExperienceDto experienceDto, ArtistProfile artistProfile) {
        return new Experience(
                artistProfile,
                experienceDto.getCompany(),
                experienceDto.getCity(),
                experienceDto.getPosition(),
                experienceDto.getStartDate(),
                experienceDto.getEndDate(),
                experienceDto.getDescription()
        );
    }

    public Set<ExperienceDto> mapEntitySetToDtoSet(Set<Experience> experienceSet) {
        return experienceSet.stream()
                .map(this::mapToDto)
                .collect(Collectors.toSet());
    }

    public ExperienceDto mapToDto(Experience experienceDto) {
        return new ExperienceDto(
                experienceDto.getCompany(),
                experienceDto.getCity(),
                experienceDto.getPosition(),
                experienceDto.getStartDate(),
                experienceDto.getEndDate(),
                experienceDto.getDescription()
        );
    }
}
