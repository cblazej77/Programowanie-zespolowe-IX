package com.pz.designmatch.service;

import com.pz.designmatch.model.user.UserEntity;

public interface ConfirmationTokenService {
    String saveConfirmationToken(UserEntity user);

    String confirmToken(String token);
}
