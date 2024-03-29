package com.pz.designmatch.service;

import com.pz.designmatch.model.user.UserEntity;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;

public interface ConfirmationTokenService {
    String saveConfirmationToken(UserEntity user);

    RedirectView confirmToken(String token);
}
