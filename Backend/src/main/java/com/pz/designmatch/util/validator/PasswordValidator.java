package com.pz.designmatch.util.validator;

import com.pz.designmatch.dto.request.RegisterRequest;
import jakarta.validation.ValidationException;

public class PasswordValidator {

    public boolean isValid(final RegisterRequest user) throws ValidationException {
        if (user.getPassword() == null || user.getMatchingPassword() == null)
            throw new ValidationException("Hasło nie może być puste.");
        if (!user.getPassword().equals(user.getMatchingPassword()))
            throw new ValidationException("Hasła nie są takie same.");
        if (user.getPassword().length() < 6)
            throw new ValidationException("Hasło musi mieć minimum 6 znaków.");
        return true;
    }
}
