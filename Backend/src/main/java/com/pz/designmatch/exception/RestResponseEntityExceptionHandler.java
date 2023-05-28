package com.pz.designmatch.exception;

import com.pz.designmatch.dto.response.MyApiResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    public RestResponseEntityExceptionHandler() {
        super();
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(final MethodArgumentNotValidException ex, final HttpHeaders headers, final HttpStatusCode status,
                                                                  final WebRequest request) {
        logger.error("400 Status Code", ex);
        final BindingResult result = ex.getBindingResult();

        String error = result.getAllErrors().stream().map(e -> {
            if (e instanceof FieldError) {
                return ((FieldError) e).getField() + " : " + e.getDefaultMessage();
            } else {
                return e.getObjectName() + " : " + e.getDefaultMessage();
            }
        }).collect(Collectors.joining(", "));
        return handleExceptionInternal(ex, new MyApiResponse(false, error), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}
//@ControllerAdvice
//public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
//
//    @ExceptionHandler(value = {UsernameNotFoundException.class, ArtistProfileNotFound.class})
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public ErrorObject handleUsernameNotFoundException(Exception ex) {
//        return new ErrorObject(HttpStatus.NOT_FOUND.value(), ex.getMessage(), new Date());
//    }
//
//    @ExceptionHandler(value = RuntimeException.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public ErrorObject handleRuntimeException(RuntimeException ex) {
//        return new ErrorObject(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage(), new Date());
//    }
//}