package com.pz.designmatch.util.mapper;

import com.pz.designmatch.dto.request.CommissionRequest;
import com.pz.designmatch.dto.response.CommissionResponse;
import com.pz.designmatch.model.Commission;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class CommissionMapper {
    private final UserRepository userRepository;

    @Autowired
    public CommissionMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Commission mapToEntity(CommissionRequest commissionRequest) throws UsernameNotFoundException {
        Optional<UserEntity> client = userRepository.findByUsername(commissionRequest.getClientUsername());
        Optional<UserEntity> contractor = commissionRequest.getContractorUsername() != null ? userRepository.findByUsername(commissionRequest.getContractorUsername()) : Optional.empty();

        if (client.isEmpty() ) {
            throw new UsernameNotFoundException("Klient nie istnieje");
        }
        return new Commission(
                client.get(),
                contractor.orElse(null),
                commissionRequest.getTitle(),
                commissionRequest.getDescription(),
                LocalDateTime.now(),
                commissionRequest.getDeadline(),
                commissionRequest.getLevel().stream().map(Level::fromDisplayName).collect(Collectors.toSet()),
                commissionRequest.getLocation().stream().map(City::fromDisplayName).collect(Collectors.toSet()),
                commissionRequest.getSkills().stream().map(Skill::fromDisplayName).collect(Collectors.toSet()),
                commissionRequest.getTags().stream().map(Tag::fromDisplayName).collect(Collectors.toSet()),
                commissionRequest.getLanguages().stream().map(Language::fromDisplayName).collect(Collectors.toSet()),
                commissionRequest.getRate());
    }

    public CommissionResponse mapToResponse(Commission commission) {
        return new CommissionResponse(
                commission.getId(),
                commission.getClient().getUsername(),
                commission.getContractor() != null ? commission.getContractor().getUsername() : null,
                commission.getTitle(),
                commission.getDescription(),
                commission.getCommissionedAt(),
                commission.getDeadline(),
                commission.getCompletedAt(),
                commission.getLevel().stream().map(Level::getDisplayName).collect(Collectors.toSet()),
                commission.getLocation().stream().map(City::getDisplayName).collect(Collectors.toSet()),
                commission.getSkills().stream().map(Skill::getDisplayName).collect(Collectors.toSet()),
                commission.getTags().stream().map(Tag::getDisplayName).collect(Collectors.toSet()),
                commission.getLanguages().stream().map(Language::getDisplayName).collect(Collectors.toSet()),
                commission.getRate(),
                commission.isCompleted()
        );
    }
}
