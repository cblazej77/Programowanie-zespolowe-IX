package com.pz.designmatch.service;

import com.pz.designmatch.dto.request.RegisterRequest;
import com.pz.designmatch.exception.UserAlreadyExistAuthenticationException;
import com.pz.designmatch.model.user.UserEntity;
import jakarta.validation.ValidationException;

public interface UserService {

    UserEntity findUserByEmail(String email);

    UserEntity registerNewUser(RegisterRequest registerRequest, String roleName) throws UserAlreadyExistAuthenticationException, ValidationException;
}