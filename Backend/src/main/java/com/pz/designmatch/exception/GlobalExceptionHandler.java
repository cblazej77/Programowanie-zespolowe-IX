package com.pz.designmatch.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

//@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {UsernameNotFoundException.class, ArtistProfileNotFound.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorObject handleUsernameNotFoundException(Exception ex) {
        return new ErrorObject(HttpStatus.NOT_FOUND.value(), ex.getMessage(), new Date());
    }

    @ExceptionHandler(value = RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorObject handleRuntimeException(RuntimeException ex) {
        return new ErrorObject(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage(), new Date());
    }
}