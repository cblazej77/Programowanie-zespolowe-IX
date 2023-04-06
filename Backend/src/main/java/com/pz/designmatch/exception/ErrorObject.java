package com.pz.designmatch.exception;

import lombok.Getter;

import java.util.Date;

@Getter
public class ErrorObject {
    private final Integer statusCode;
    private final String message;
    private final Date timestamp;
//    @JsonCreator
//    public ErrorObject(@JsonProperty("statusCode") Integer statusCode,
//                       @JsonProperty("message") String message,
//                        @JsonProperty("timestamp") Date timestamp) {
//        this.statusCode = statusCode;
//        this.message = message;
//        this.timestamp = timestamp;
//    }

    public ErrorObject(Integer statusCode, String message, Date timestamp) {
        this.statusCode = statusCode;
        this.message = message;
        this.timestamp = timestamp;
    }
}
