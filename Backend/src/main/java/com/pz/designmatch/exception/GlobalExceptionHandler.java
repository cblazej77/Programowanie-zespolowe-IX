package com.pz.designmatch.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorObject> handleUsernameNotFoundException(UsernameNotFoundException ex, WebRequest request) {
        ErrorObject errorObject = new ErrorObject(HttpStatus.UNAUTHORIZED.value(), "Invalid email or password", new Date());
        return new ResponseEntity<>(errorObject, HttpStatus.UNAUTHORIZED);
    }
}
