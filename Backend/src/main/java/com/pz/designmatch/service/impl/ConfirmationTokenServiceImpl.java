package com.pz.designmatch.service.impl;

import com.pz.designmatch.model.user.ConfirmationToken;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.ConfirmationTokenRepository;
import com.pz.designmatch.service.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ConfirmationTokenServiceImpl implements ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    public String saveConfirmationToken(UserEntity user) {
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now(), LocalDateTime.now().plusMinutes(15), user);
        confirmationTokenRepository.save(confirmationToken);
        return token;
    }

    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = getToken(token).orElseThrow(() -> new IllegalStateException("Token not found"));
        if (confirmationToken.getConfirmedAt() != null) {
            return "Email already confirmed";
        }
        LocalDateTime expiresAt = confirmationToken.getExpiresAt();
        if (expiresAt.isBefore(LocalDateTime.now())) {
            return "Token expired";
        }

        setConfirmedAt(token);
        return "Email confirmed";
    }

    private void setConfirmedAt(String token) {
        confirmationTokenRepository.updateConfirmedAt(token, LocalDateTime.now());
    }

    private Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }
}
