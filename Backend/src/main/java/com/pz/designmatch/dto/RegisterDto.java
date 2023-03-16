package com.pz.designmatch.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String email;
    private String username;
    private String password;
    private String firstname;
    private String lastname;
}
