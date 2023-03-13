package com.pz.login.exception;

import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class ErrorObject {
    private Integer statusCode;

    private String message;

    private Date timestamp;
}
