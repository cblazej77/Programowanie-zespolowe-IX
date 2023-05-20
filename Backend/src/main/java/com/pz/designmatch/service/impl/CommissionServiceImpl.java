package com.pz.designmatch.service.impl;


import com.pz.designmatch.dto.request.CommissionFilterRequest;
import com.pz.designmatch.dto.request.CommissionRequest;
import com.pz.designmatch.dto.response.CommissionResponse;
import com.pz.designmatch.model.Commission;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.repository.CommissionRepository;
import com.pz.designmatch.service.CommissionService;
import com.pz.designmatch.specification.CommissionSpecification;
import com.pz.designmatch.util.mapper.CommissionMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommissionServiceImpl implements CommissionService {

    private final CommissionRepository commissionRepository;
    private final CommissionMapper commissionMapper;

    public CommissionServiceImpl(CommissionRepository commissionRepository, CommissionMapper commissionMapper) {
        this.commissionRepository = commissionRepository;
        this.commissionMapper = commissionMapper;
    }

    public CommissionResponse getCommissionById(Long id) {
        Commission existingCommission = commissionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nie istnieje zlecenie o id: " + id));
        return commissionMapper.mapToResponse(existingCommission);
    }

    public CommissionResponse createCommission(CommissionRequest commissionRequest) {
        Commission commission = commissionMapper.mapToEntity(commissionRequest);
        return commissionMapper.mapToResponse(commissionRepository.save(commission));
    }


    @Override
    public List<CommissionResponse> getCommissionsByUsername(String username) {
        List<Commission> commissions = commissionRepository.findAllByUserUsername(username);
        return commissions.stream()
                .map(commissionMapper::mapToResponse)
                .collect(Collectors.toList());
    }



    public CommissionResponse updateCommissionById(Long id, CommissionRequest commissionRequest) throws EntityNotFoundException {
        Commission existingCommission = commissionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nie istnieje zlecenie o id: " + id));

        Optional.ofNullable(commissionRequest.getTitle()).ifPresent(existingCommission::setTitle);
        Optional.ofNullable(commissionRequest.getDescription()).ifPresent(existingCommission::setDescription);
        Optional.ofNullable(commissionRequest.getDeadline()).ifPresent(existingCommission::setDeadline);
        Optional.ofNullable(commissionRequest.getLevel())
                .map(levels -> levels.stream().map(Level::fromDisplayName).collect(Collectors.toSet()))
                .ifPresent(existingCommission::setLevel);
        Optional.ofNullable(commissionRequest.getLocation())
                .map(locations -> locations.stream().map(City::fromDisplayName).collect(Collectors.toSet()))
                .ifPresent(existingCommission::setLocation);
        Optional.ofNullable(commissionRequest.getLanguages())
                .map(languages -> languages.stream().map(Language::fromDisplayName).collect(Collectors.toSet()))
                .ifPresent(existingCommission::setLanguages);
        Optional.ofNullable(commissionRequest.getSkills())
                .map(skills -> skills.stream().map(Skill::fromDisplayName).collect(Collectors.toSet()))
                .ifPresent(existingCommission::setSkills);
        Optional.ofNullable(commissionRequest.getTags())
                .map(tags -> tags.stream().map(Tag::fromDisplayName).collect(Collectors.toSet()))
                .ifPresent(existingCommission::setTags);
        Optional.ofNullable(commissionRequest.getRate()).ifPresent(existingCommission::setRate);

        return commissionMapper.mapToResponse(commissionRepository.save(existingCommission));
    }

    public CommissionResponse setCommissionCompletedById(Long id) throws EntityNotFoundException {
        Commission existingCommission = commissionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nie istnieje zlecenie o id: " + id));

        existingCommission.setCompleted(true);
        existingCommission.setCompletedAt(LocalDateTime.now());
        return commissionMapper.mapToResponse(commissionRepository.save(existingCommission));
    }

    public Page<CommissionResponse> filterCommissions(CommissionFilterRequest filterRequest, Pageable pageable) {
        Specification<Commission> specification = Specification.where(null);

        if (filterRequest.getLevels() != null && !filterRequest.getLevels().isEmpty()) {
            List<Level> levelList = filterRequest.getLevels().stream()
                    .map(Level::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            specification = specification.and(CommissionSpecification.hasLevel(levelList));
        }

        if (filterRequest.getLocations() != null && !filterRequest.getLocations().isEmpty()) {
            List<City> cityList = filterRequest.getLocations().stream()
                    .map(City::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            specification = specification.and(CommissionSpecification.hasCity(cityList));
        }

        if (filterRequest.getSkills() != null && !filterRequest.getSkills().isEmpty()) {
            List<Skill> skillList = filterRequest.getSkills().stream()
                    .map(Skill::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            specification = specification.and(CommissionSpecification.hasSkills(skillList));
        }

        if (filterRequest.getLanguages() != null && !filterRequest.getLanguages().isEmpty()) {
            List<Language> languageList = filterRequest.getLanguages().stream()
                    .map(Language::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            specification = specification.and(CommissionSpecification.hasLanguage(languageList));
        }

        if (filterRequest.getTags() != null && !filterRequest.getTags().isEmpty()) {
            List<Tag> tagList = filterRequest.getTags().stream()
                    .map(Tag::fromDisplayName)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
            specification = specification.and(CommissionSpecification.hasTag(tagList));
        }

        Page<Commission> commissionPage = commissionRepository.findAll(specification, pageable);
        return commissionPage.map(commissionMapper::mapToResponse);
    }
}